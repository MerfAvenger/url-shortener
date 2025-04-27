import { SyntheticEvent } from "react";
import { isProcessedUrl } from "../../utils/is";
import submitFormRequest from "../../utils/request";

export async function createUrl(
  event: SyntheticEvent,
  onCreate: (createdShortUrl: string) => void,
  onError: (error: string | null) => void,
  updateUrls: (newUrl: string) => void,
): Promise<void> {
  console.log("Submitting data to /api/create-url");
  const url = await submitFormRequest(event, "/api/create-url");

  if (!isProcessedUrl(url)) {
    onError("Failed to create URL.");
    return;
  }

  const shortUrl = `${window.origin}/${url.slug}`;
  onCreate(shortUrl);
  // Reset the error state after a successful creation.
  onError(null);
  updateUrls(JSON.stringify([url]));

  console.log("URL created successfully:", shortUrl);
}
