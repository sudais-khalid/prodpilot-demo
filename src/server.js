const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
const origin = process.env.CORS_ORIGIN || "*";

app.use(helmet());
app.use(cors({ origin }));
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.get("/api", (req, res) => res.json({ name: "prodpilot-demo", version: "1.0.0" }));

app.use((req, res) => res.status(404).json({ error: "not found" }));

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: "internal error" });
});

app.listen(port, () => console.log(`listening on ${port}`));
