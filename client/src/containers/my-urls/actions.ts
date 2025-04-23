import { URL } from "../../model";
import { isProcessedUrlArray } from "../../utils/is";

export function parseUrlString(urlString: string): URL[] {
  try {
    const urls = JSON.parse(urlString);

    if (!isProcessedUrlArray(urls)) {
      console.error("Invalid URL data format.");
      return [];
    }

    return urls;
  } catch (error) {
    console.error("Error parsing URL string:", error);
    return [];
  }
}
