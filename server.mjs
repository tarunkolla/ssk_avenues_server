import express from "express";
import mongoose from "mongoose";
import config from "./config/index.mjs";
import path from "path";

const __dirname = path.resolve();

const app = express();
const { MONGO_URI, PORT } = config;

app.use(express.json());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connected..."))
  .catch((error) => console.log(error, "connecting to database..."));

//route imports
import users from "./controllers/api/users.mjs";
import files from "./controllers/api/files.mjs";
import layouts from "./controllers/api/layouts.mjs";
import plots from "./controllers/api/plots.mjs";
import smtp from "./controllers/api/smtp.mjs";

//routes
app.use("/api", users);
app.use("/api", files);
app.use("/api/layouts", layouts);
app.use("/api/plots", plots);
app.use("/api/smtp", smtp);

app.use(express.static(path.join(__dirname, "../ssk-avenues-js/build")));

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../ssk-avenues-js/build/index.html"));
});

app.listen(PORT, () => console.log(`server on port ${PORT} started...`));
