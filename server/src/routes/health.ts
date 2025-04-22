import type { Route, Method } from "../types";

const method: Method = "GET";
const path = "/api/health";
const handler = async function (_req, res) {
  res.status(200);
  res.json({
    status: "ok",
    message: "Server is running",
  });
};

// Enforce type on the export to ensure that the route is valid
const route: Route = { method, path, handler };
export default route;
