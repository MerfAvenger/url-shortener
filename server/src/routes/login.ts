import { Method } from "../types";
import UserService from "../services/UserService";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";

const method: Method = "POST";
const path = "/login";
const handler = async function (req, res) {
  const { email, password } = req.body;
  console.log(`Received request to login to user ${email}.`);

  try {
    if (!isEmail(email) || !isStrongPassword(password)) {
      res.status(400).send("Invalid email address or password.");
      return;
    }

    const user = await UserService.loginUser(email, password);

    if (!user) {
      res.status(400).send("Invalid email address or password.");
    }

    console.log(`User ${user.email} logged in successfully:`);
    return res.status(200).send({ email });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Internal server error");
  }
};

export default {
  method,
  path,
  handler,
};
