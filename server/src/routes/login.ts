import { Method } from "../types";
import UserService from "../services/UserService";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";
import URLService from "../services/URLService";

const method: Method = "POST";
const path = "/api/login";
const handler = async function (req, res) {
  const { email, password } = req.body;
  console.log(`Received request to login to user ${email}.`);

  try {
    if (!isEmail(email) || !isStrongPassword(password)) {
      console.warn(`Failed to login user ${email}: Invalid email or password.`);
      return res.status(400).send("Invalid email address or password.");
    }

    const user = await UserService.loginUser(email, password);

    if (!user) {
      console.warn(`Failed to login user ${email} - could not find user.`);
      return res.status(400).send("Invalid email address or password.");
    }

    const urls = (await URLService.getUserUrls(user)) || [];

    if (!Array.isArray(urls)) {
      console.warn(`Failed to get URLs for user ${user.email}.`);
    }

    console.log(`User ${user.email} has ${urls.length} URLs.`);

    console.log(`User ${user.email} logged in successfully:`);
    return res.status(200).send({ email: user.email, id: user.id, urls });
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
