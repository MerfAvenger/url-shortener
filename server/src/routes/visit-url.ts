import { Method } from "../types";
import URLService from "../services/URLService";

const method: Method = "GET";
const path = "/:url";
const handler = async function (req, res) {
  const { url } = req.params;
  console.log(`Received request to visit URL ${url}.`);

  if (!url) {
    console.warn("No URL provided in request.");
    res.status(400).send("No URL provided.");
    return;
  }

  try {
    const existingUrl = await URLService.getUrlBySlug(url);

    if (!existingUrl) {
      console.log(`URL ${url} not found.`);
      return res.status(404).json({ error: "URL not found" });
    }

    console.log(
      `URL ${url} redirects to ${existingUrl.long}. Incrementing visit count from ${existingUrl.visits}.`
    );
    const updatedUrl = await URLService.visitUrl(existingUrl);

    console.log(`URL ${url} visit count updated to ${updatedUrl.visits}.`);

    if (!updatedUrl) {
      console.warn(`Failed to update visit count for URL ${url}.`);
    }

    // If a cached response is used, the visit count of a URL will not be updated until the cache invalidates.
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");

    console.log(`Redirecting to long URL ${updatedUrl.long}.`);
    return res.redirect(308, updatedUrl.long);
  } catch (error) {
    console.error("Error visiting URL:", error);
    res.status(500).send("Internal server error");
    return;
  }
};

export default {
  method,
  path,
  handler,
};
