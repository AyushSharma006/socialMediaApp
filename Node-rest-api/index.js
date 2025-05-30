const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const PostRout = require("./routes/posts");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const messageRoute = require("./routes/message");
const conversationRoute = require("./routes/conversation");

app.use(cors({
  origin: '*',
  credentials: true,
}));

mongoose.connect(
  "mongodb+srv://ayushsharma06:passMongodb@cluster1.8ysp1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"
);

const User = require("./models/userMode");
const { createBrotliCompress } = require("zlib");
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/images", express.static(path.join(__dirname, "public/images")));

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
    const uploadedFileName = req.file.filename; // Send filename to frontend
    return res.status(200).json(uploadedFileName);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Upload failed");
  }
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", PostRout);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.get("/", (req, res) => {
  res.send("welcome to homepage");
});

app.listen(8000, () => {});

