import pool from "../database/pool";
import { User } from "../model";
import { INSERT_USER, SELECT_USER_BY_EMAIL } from "../queries";
import { calculateHashedPassword, generateSalt } from "../utils/crypto";

export default class UserService {
  /**
   * Fetch a user with the given email from the database, if they exist.
   *
   * @param email
   * @returns An existing user, or null if no user was found.
   * @throws Errors from the database to bubble up to the caller.
   */
  static async getUserByEmail(email: string): Promise<User | null> {
    console.log(`User Service: Getting user by email ${email}.`);
    const client = await pool.connect();

    const query = {
      text: SELECT_USER_BY_EMAIL,
      values: [email],
    };

    return await client
      .query(query)
      .then((user) => {
        if (user.rows.length > 0) {
          const userData = user.rows[0];
          return {
            id: userData.id,
            email: userData.email,
            salt: userData.salt,
            password: userData.password,
          };
        }
        return null;
      })
      .catch((error) => {
        console.error(
          `User Service: Error getting user ${email} by email:`,
          error
        );
        throw error;
      })
      .finally(() => {
        console.info("User Service: Releasing client connection.");
        client.release();
      });
  }

  /**
   * Create a new user in the database.
   *
   * **Note:** this does not check if the user already exists!
   * That is the responsibility of the caller.
   *
   * @param email
   * @param password
   * @returns The created user, or null if the user was not created.
   * @throws Errors from the database to bubble up to the caller.
   */
  static async createUser(
    email: string,
    password: string
  ): Promise<User | null> {
    console.log(`User Service: Creating user with email ${email}.`);
    const client = await pool.connect();

    const salt = generateSalt();
    const hashedPassword = await calculateHashedPassword(password, salt);

    const query = {
      text: INSERT_USER,
      values: [email, salt, hashedPassword],
    };

    return await client
      .query(query)
      .then((user) => {
        if (user.rows.length === 0) {
          console.warn(`User Service: No user created for email ${email}.`);
          return null;
        }
        const userData = user.rows[0];
        const newUser = {
          id: userData.id,
          email: userData.email,
          salt: userData.salt,
          password: userData.password,
        };

        console.log(`User Service: User ${email} created successfully`);
        return newUser;
      })
      .catch((error) => {
        console.error("User Service: Error creating user:", error);
        throw error;
      })
      .finally(() => {
        client.release();
      });
  }

  /**
   * Log in a user with the given email and password.
   *
   * @param email
   * @param password
   * @returns The logged-in user, or null if the login failed.
   * @throws Errors from the database to bubble up to the caller.
   */
  static async loginUser(
    email: string,
    password: string
  ): Promise<User | null> {
    console.log(`User Service: Logging in to user ${email}.`);
    const client = await pool.connect();

    const query = {
      text: SELECT_USER_BY_EMAIL,
      values: [email],
    };

    return await client
      .query(query)
      .then(async (result) => {
        if (result.rows.length === 0) {
          console.warn(
            "User Service: No user found with the provided email:",
            email
          );
          return null;
        }

        const user = result.rows[0];
        const salt = user.salt;
        const hashedPassword = await calculateHashedPassword(password, salt);

        if (hashedPassword !== user.password) {
          console.warn("User Service: Invalid password for user:", email);
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          salt: user.salt,
          password: user.password,
        };
      })
      .catch((error) => {
        console.error("User Service: Error logging in:", error);
        throw error;
      })
      .finally(() => {
        console.info("User Service: Releasing client connection.");
        client.release();
      });
  }
}
