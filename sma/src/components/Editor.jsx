import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = () => {
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("// Write your code here");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isCompiling, setIsCompiling] = useState(false);
  const editorRef = useRef(null);

  const languages = [
    { label: "C", value: "c" },
    { label: "C++", value: "cpp" },
    { label: "Java", value: "java" },
    { label: "Python", value: "python" },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      alert("Code copied to clipboard!");
    } catch {
      alert("Failed to copy code");
    }
  };

  const handleCompile = async () => {
    setIsCompiling(true);
    setOutput("Compiling...");
    try {
      const response = await fetch("http://localhost:8000/api/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language, input }),
      });
      const result = await response.json();
      setOutput(
        result.error
          ? `Error: ${result.output || result.error}`
          : result.output || "No output"
      );
    } catch {
      setOutput("Error compiling code.");
    } finally {
      setIsCompiling(false);
    }
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK, () => {
      editor.getAction("editor.action.formatDocument").run();
    });
  };

  return (
    <div className="h-screen p-2 bg-gray-100 overflow-hidden">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-lg font-bold">🧠 Code Editor</h1>
        <div className="flex gap-2">
          <select
            className="px-2 py-1 border rounded text-sm"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
          <button
            onClick={handleCopy}
            className="px-2 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            Copy
          </button>
          <button
            onClick={handleCompile}
            className="px-2 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
            disabled={isCompiling}
          >
            {isCompiling ? "Compiling..." : "Compile"}
          </button>
        </div>
      </div>

      <div className="h-[50vh] border rounded shadow bg-white mb-2">
        <Editor
          language={language}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
          onMount={handleEditorDidMount}
          options={{
            fontSize: 13,
            minimap: { enabled: false },
            automaticLayout: true,
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-[calc(50vh-3rem)]">
        <div className="p-2 bg-white rounded border shadow overflow-auto text-sm">
          <h2 className="font-semibold mb-1 text-gray-700">Input:</h2>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-full border p-2 rounded text-sm font-mono resize-none"
            placeholder="Enter input for the program"
          />
        </div>
        <div className="p-2 bg-white rounded border shadow overflow-auto text-sm">
          <h2 className="font-semibold mb-1 text-gray-700">Output:</h2>
          <div className="text-gray-800 whitespace-pre-wrap">{output}</div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
