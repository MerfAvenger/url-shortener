import "dotenv/config";

const port = process.env.PORT || 3000;
const appDirectory = process.env.APP_DIRECTORY || "app";

export default {
  port,
};
