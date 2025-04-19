import "dotenv/config";

const host = process.env.SERVER_HOST || "localhost";
const port = process.env.SERVER_PORT || 3000;
const appDirectory = process.env.APP_DIRECTORY || "client";

const databaseHost = process.env.SERVER_DATABASE_HOST || "database";
const databasePort = parseInt(process.env.POSTGRES_PORT) || 5432;

const databaseUser = process.env.POSTGRES_USER;
const databasePassword = process.env.POSTGRES_PASSWORD;
const databaseName = process.env.POSTGRES_DB;

const databaseMaxConnections =
  parseInt(process.env.SERVER_DATABASE_MAX_CONNECTIONS) || 10;
const databaseIdleTimeout =
  parseInt(process.env.SERVER_DATABASE_IDLE_TIMEOUT) || 10000;
const databaseConnectionTimeout =
  parseInt(process.env.SERVER_DATABASE_CONNECTION_TIMEOUT) || 2000;

if (!databaseUser || !databasePassword || !databaseName) {
  throw new Error(
    "Cannot initialise database: There are missing credentials in the environment variables."
  );
}

export default {
  appDirectory,
  host,
  port,
  database: {
    host: databaseHost,
    port: databasePort,
    user: databaseUser,
    password: databasePassword,
    name: databaseName,
    connections: {
      max: databaseMaxConnections,
    },
    timeouts: {
      idleTimeout: databaseIdleTimeout,
      connectionTimeout: databaseConnectionTimeout,
    },
  },
};
