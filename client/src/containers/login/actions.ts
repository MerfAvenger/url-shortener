import { SyntheticEvent } from "react";
import submitFormRequest from "../../utils/request";
import { isUser } from "../../utils/is";

export async function login(
  event: SyntheticEvent,
  setUserEmail: (email: string | null) => void,
  setUserId: (id: number | null) => void,
  setUrlString: (urls: string) => void,
): Promise<void> {
  console.log("Submitting data to /api/login");
  const user = await submitFormRequest(event, "/api/login");

  if (isUser(user)) {
    setUserEmail(user.email);
    setUserId(user.id);
    // The URLs need to be stored as a string otherwise state updates will not trigger properly.
    setUrlString(JSON.stringify(user.urls));
  } else {
    throw new Error("Invalid user response.");
  }
  console.log("User logged in successfully:", user);
}

export async function createAccount(
  event: SyntheticEvent,
  setUserEmail: (email: string | null) => void,
  setUserId: (id: number | null) => void,
): Promise<void> {
  console.log("Submitting data to /api/create-account");
  const user = await submitFormRequest(event, "/api/create-account");

  if (isUser(user)) {
    setUserEmail(user.email);
    setUserId(user.id);
  }

  console.log("Account created successfully:", user);
}
