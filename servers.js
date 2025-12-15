import express from "express";
import path from "path";
import { fileURLToPath } from 'url';

// __dirname / __filename polyfill for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// 指定静态文件目录
app.use(express.static(path.join(__dirname, "dist"))); // Vite 打包后的目录

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
