import { Method } from "../types";
import UserService from "../services/UserService";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";

const method: Method = "POST";
const path = "/api/create-account";

const handler = async function (req, res) {
  const { email, password } = req.body;

  try {
    const existingUser = await UserService.getUserByEmail(email);

    if (existingUser) {
      console.warn("Email already exists:", email);

      res.status(400).send("Email already exists.");
      return;
    }

    if (!isEmail(email)) {
      console.warn("Failed to create user: Invalid email address:", email);
      res.status(400).send("Invalid email address.");
      return;
    }

    if (!isStrongPassword(password)) {
      console.warn(
        "Failed to create user: Password does not meet strength requirements.",
        email
      );
      res
        .status(400)
        .send(
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one symbol."
        );
      return;
    }

    const user = await UserService.createUser(email, password);
    if (!user) {
      console.warn("Failed to create user:", email);
      res.status(400).send("Failed to create user.");
      return;
    }

    console.log("User created successfully:", email);
    res.status(201).send({ email: user.email, id: user.id });
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).send("Internal server error");
  }
};

export default {
  method,
  path,
  handler,
};
