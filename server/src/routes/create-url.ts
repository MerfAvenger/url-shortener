import URLService from "../services/URLService";
import { Method } from "../types";
import isUrl from "validator/lib/isURL";

const method: Method = "POST";
const path = "/api/create-url";
const handler = async function (req, res) {
  const {
    url,
    user: { id, email },
  } = req.body;
  console.log(`Received request to create URL: ${url}.`);

  try {
    if (!isUrl(url)) {
      console.warn(`Failed to create URL ${url}: Invalid URL`);
      res.status(400).send("Invalid URL.");
      return;
    }

    const processedUrl = await URLService.createUrl(id, url);
    if (!processedUrl) {
      console.warn(`Failed to create URL ${url} for user ${email}.`);
      res.status(400).send("Failed to create URL.");
      return;
    }

    console.log(
      `URL ${processedUrl.slug} created successfully for user ${email}.`
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
