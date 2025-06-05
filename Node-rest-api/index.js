const express = require("express");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer");
const http = require("http");
const { Server } = require("socket.io");

// Import routes
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const PostRout = require("./routes/posts");
const messageRoute = require("./routes/message");
const conversationRoute = require("./routes/conversation");
const groupRoute = require("./routes/groups");

// Import models
const User = require("./models/userMode");
const ChatMessage = require("./models/chatModel");

require("dotenv").config();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

// CORS Configuration
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

mongoose.connect(process.env.MONGO_URL, {
  dbName: "Learnify",
});

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/images", express.static(path.join(__dirname, "public/images")));

io.on("connection", (socket) => {
  console.log("✅ New user connected:", socket.id);

  socket.on("joinGroup", (groupId) => {
    socket.join(groupId);
    console.log(`📢 Socket ${socket.id} joined group ${groupId}`);
  });

  socket.on("groupMessage", async ({ groupId, userId, text }) => {
    if (!text?.trim()) return;

    try {
      const message = await ChatMessage.create({
        group: groupId,
        sender: userId,
        text,
        timestamp: new Date(),
      });

      io.to(groupId).emit("newMessage", {
        _id: message._id,
        groupId,
        sender: userId,
        text,
        timestamp: message.timestamp,
      });
    } catch (err) {
      console.error("❌ Message DB error:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("❎ User disconnected:", socket.id);
  });
});

const tempDir = path.join(__dirname, "temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

// Create public/images directory if it doesn't exist
const imagesDir = path.join(__dirname, "public/images");
if (!fs.existsSync(path.join(__dirname, "public"))) {
  fs.mkdirSync(path.join(__dirname, "public"));
}
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "_" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

app.post("/api/uploads", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const uploadedFileName = req.file.filename;
    return res.status(200).json({ filename: uploadedFileName });
  } catch (error) {
    console.log("Upload error:", error);
    return res.status(500).json({ error: "Upload failed" });
  }
});

// Code compilation endpoint
app.post("/api/compile", async (req, res) => {
  try {
    const { code, language, input = "" } = req.body;

    if (!code || !language) {
      return res.status(400).json({ error: "Code and language are required" });
    }

    const id = uuidv4();
    const codeFileMap = {
      c: "Main.c",
      cpp: "Main.cpp",
      java: "Main.java",
      python: "main.py",
    };
    const fileName = codeFileMap[language];
    if (!fileName) {
      return res.status(400).json({ error: "Unsupported language" });
    }

    const runCommandMap = {
      c: `gcc ${codeFileMap.c} -o out && ./out`,
      cpp: `g++ ${codeFileMap.cpp} -o out && ./out`,
      java: `javac ${codeFileMap.java} && java Main`,
      python: `python3 ${codeFileMap.python}`,
    };
    const runCommand = runCommandMap[language];

    const dockerImageMap = {
      c: "my-c-runner",
      cpp: "my-cpp-runner",
      java: "my-java-runner",
      python: "my-python-runner",
    };
    const dockerImage = dockerImageMap[language];

    const workDir = path.join(tempDir, id);
    fs.mkdirSync(workDir, { recursive: true });

    // Write code
    fs.writeFileSync(path.join(workDir, fileName), code);

    // Write input file (for stdin)
    const inputPath = path.join(workDir, "input.txt");
    fs.writeFileSync(inputPath, input);

    // Shell script to compile and run with redirected input
    const runShPath = path.join(workDir, "run.sh");
    const finalCommand = `${runCommand} < input.txt`;

    fs.writeFileSync(runShPath, `#!/bin/sh\n${finalCommand}\n`);
    fs.chmodSync(runShPath, "755");

    if (!dockerImage) {
      fs.rmSync(workDir, { recursive: true, force: true });
      return res.status(400).json({ error: "Unsupported language" });
    }

    // Docker exec
    exec(
      `docker run --rm -v ${workDir}:/app -w /app ${dockerImage}`,
      { timeout: 10000 },
      (runErr, stdout, stderr) => {
        fs.rmSync(workDir, { recursive: true, force: true });

        if (runErr) {
          if (runErr.signal === "SIGTERM") {
            return res.json({
              output: "Error: Code execution timed out (10 seconds limit)",
              error: true,
            });
          }
          return res.json({
            output: stderr || runErr.message,
            error: true,
          });
        }

        res.json({
          output: stdout || "Code executed successfully (no output)",
          error: false,
        });
      }
    );
  } catch (error) {
    console.error("Compilation error:", error);
    res.status(500).json({
      error: "Internal server error during compilation",
      details: error.message,
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    services: {
      database:
        mongoose.connection.readyState === 1 ? "connected" : "disconnected",
      compiler: fs.existsSync(tempDir) ? "ready" : "not ready",
    },
  });
});

// Social media routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", PostRout);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/groups", groupRoute);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Learnify API",
    version: "1.0.0",
    endpoints: {
      social: [
        "/api/users",
        "/api/auth",
        "/api/posts",
        "/api/conversations",
        "/api/messages",
      ],
      compiler: ["/api/compile"],
      utilities: ["/api/uploads", "/api/health"],
    },
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Cleaning up...");
  // Clean up temp directory
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT received. Cleaning up...");
  // Clean up temp directory
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
  process.exit(0);
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`💻 Compiler API: http://localhost:${PORT}/api/compile`);
  console.log(`📱 Social API: http://localhost:${PORT}/api/*`);
  console.log(`📡 Socket.IO ready at ws://localhost:${PORT}`);
});
