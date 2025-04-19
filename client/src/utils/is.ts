import { URL, User } from "../model";

export function isFormElement(element: any): element is HTMLFormElement {
  return element instanceof HTMLFormElement;
}

export function isProcessedUrl(processedUrl: any): processedUrl is URL {
  return (
    processedUrl &&
    typeof processedUrl === "object" &&
    typeof processedUrl.slug === "string" &&
    typeof processedUrl.long === "string" &&
    typeof processedUrl.visits === "number"
  );
}

export function isUser(user: any): user is User {
  return (
    user &&
    typeof user === "object" &&
    typeof user.id === "number" &&
    typeof user.email === "string"
  );
}
