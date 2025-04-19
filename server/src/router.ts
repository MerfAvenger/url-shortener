import express, { Router } from "express";
import Routes from "./routes";
import config from "./config";
import path from "path";

const router = Router();

// Iterate through exported routes and register them with the router
Routes.forEach((route) => {
  const { method, path, handler } = route;

  console.log(`Registering route: ${method} ${path}`);
  router[method.toLowerCase()](path, handler);
});

console.log(`Serving application from: ${config.appDirectory}`);
const absolutePath = path.join(__dirname, config.appDirectory);

console.log(`Configuring static routes for: ${absolutePath}`);
router.use("/assets", express.static(path.join(absolutePath, "assets")));
router.get("/", (_req, res) => {
  res.sendFile(path.join(absolutePath, "index.html"));
});

export default router;
