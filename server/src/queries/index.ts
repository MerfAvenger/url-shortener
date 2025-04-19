export const INSERT_USER =
  "INSERT INTO users (email, salt, password) VALUES ($1, $2, $3) RETURNING *";

export const SELECT_USER_BY_EMAIL = "SELECT * FROM users WHERE email = $1";
