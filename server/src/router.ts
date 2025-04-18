import express, { Router } from "express";
import Routes from "./routes";
import config from "./config";

const router = Router();

// Iterate through exported routes and register them with the router
Routes.forEach((route) => {
  const { method, path, handler } = route;

  console.log(`Registering route: ${method} ${path}`);
  router[method.toLowerCase()](path, handler);
});

console.log(`Serving application from: ${config.appDirectory}`);
const absolutePath = `${__dirname}/${config.appDirectory}`;
router.use(`/${config.appDirectory}`, express.static(absolutePath));
router.use(
  `/${config.appDirectory}/assets`,
  express.static(absolutePath + "/assets")
);
router.get("/", (_req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

export default router;
