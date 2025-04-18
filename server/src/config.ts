import "dotenv/config";

const host = process.env.SERVER_HOST || "localhost";
const port = process.env.SERVER_PORT || 3000;
const appDirectory = process.env.APP_DIRECTORY || "client";

export default {
  appDirectory,
  host,
  port,
};
