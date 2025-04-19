import { SyntheticEvent } from "react";
import submitFormRequest from "../../utils/request";
import { isUser } from "../../utils/is";

export async function login(
  event: SyntheticEvent,
  setUserEmail: (email: string | null) => void,
  setUserId: (id: number | null) => void,
): Promise<void> {
  console.log("Submitting data to /api/login");
  const user = await submitFormRequest(event, "/api/login");

  if (isUser(user)) {
    setUserEmail(user.email);
    setUserId(user.id);
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
