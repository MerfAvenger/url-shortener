import express from "express";
import router from "./router";
import config from "./config";

const app = express();
app.use(express.json());
app.use("/", router);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
