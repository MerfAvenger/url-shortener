export const INSERT_USER =
  "INSERT INTO users (email, salt, password) VALUES ($1, $2, $3) RETURNING *";

export const SELECT_USER_BY_EMAIL = "SELECT * FROM users WHERE email = $1";

export const SELECT_URLS_BY_USER_ID = "SELECT * FROM urls WHERE user = $1";

export const INSERT_URL =
  'INSERT INTO urls (slug, long, "user") VALUES ($1, $2, $3) RETURNING *';
