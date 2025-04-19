import { SyntheticEvent } from "react";
import { URL } from "../../model";
import { isProcessedUrl } from "../../utils/is";
import submitFormRequest from "../../utils/request";

export async function createUrl(event: SyntheticEvent): Promise<URL> {
  console.log("Submitting data to /api/create-url");
  const url = await submitFormRequest(event, "/api/create-url");

  if (!isProcessedUrl(url)) {
    throw new Error("Invalid URL response");
  }

  console.log("URL created successfully:", url);
  return url;
}
