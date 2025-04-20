import URLService from "../services/URLService";
import { Method } from "../types";
import isUrl from "validator/lib/isURL";

const method: Method = "POST";
const path = "/api/create-url";
const handler = async function (req, res) {
  const { long, id } = req.body;

  try {
    const parsedUserId = parseInt(id);
    console.log(
      `Received request to create URL ${long} from user ${parsedUserId}.`
    );

    if (!long || !isUrl(long)) {
      console.warn(`Failed to create URL ${long}: Invalid URL`);
      res.status(400).send("Invalid URL.");
      return;
    }

    if (!parsedUserId || typeof parsedUserId !== "number") {
      console.warn(`Failed to create URL ${long}: Invalid user ID`);
      res.status(400).send("Invalid user ID.");
      return;
    }

    const processedUrl = await URLService.createUrl(parsedUserId, long);
    if (!processedUrl) {
      console.warn(`Failed to create URL ${long} for user ${parsedUserId}.`);
      res.status(400).send("Failed to create URL.");
      return;
    }

    console.log(
      `URL ${processedUrl.slug} created successfully for user ${parsedUserId}.`
    );
    res.status(201).send({
      slug: processedUrl.slug,
      user: processedUrl.user,
      long: processedUrl.long,
      visits: processedUrl.visits,
    });
  } catch (error) {
    console.error("Error creating URL:", error);
    res.status(500).send("Internal server error");
  }
};

export default {
  method,
  path,
  handler,
};
