import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/parse-markdown-json", (req, res) => {
  const markdownContent = req.body.markdown;
  const jsonRegex = /```json([\s\S]*?)```/;
  const match = markdownContent.match(jsonRegex);
  if (!match) {
    return res.status(400).send("Error: No valid markdown JSON found.");
  }
  const jsonString = match[1].trim();

  try {
    const parsedJson = JSON.parse(jsonString);
    res.json(parsedJson);
  } catch (error) {
    res.status(400).send("Error: Invalid JSON format.");
  }
});

app.listen(port, () => {
  console.log(`Text Agents listening on port ${port}...`);
});
