import { Pool, PoolConfig } from "pg";
import config from "../config";
import { inspect } from "util";

const poolConfig: PoolConfig = {
  host: config.database.host,
  database: config.database.name,
  user: config.database.user,
  password: config.database.password,
  port: config.database.port,
  max: config.database.connections.max,
  idleTimeoutMillis: config.database.timeouts.idleTimeout,
  connectionTimeoutMillis: config.database.timeouts.connectionTimeout,
};

console.log(
  "Creating database connection pool with the following config:",
  inspect(poolConfig)
);

const pool = new Pool(poolConfig);
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export default pool;
