import express from "express";
import mongoose from "mongoose";
// import bodyParser from "body-parser";
// import methodOverride from "method-override";

import config from "./config/index.mjs";

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

//image upload dependency
// app.use(methodOverride("_method"));

//route imports
import users from "./controllers/api/users.mjs";
import images from "./controllers/api/images.mjs";
import layouts from "./controllers/api/layouts.mjs";
import plots from "./controllers/api/plots.mjs";

//routes
app.use("/api", users);
app.use("/api/images", images);
app.use("/api/layouts", layouts);
app.use("/api/plots", plots);

app.listen(PORT, () => console.log(`server on port ${PORT} started...`));
