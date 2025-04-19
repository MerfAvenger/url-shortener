import { SyntheticEvent } from "react";
import submitFormRequest from "../../utils/request";

export async function login(event: SyntheticEvent): Promise<void> {
  console.log("Submitting data to /login");
  return await submitFormRequest(event, "/login");
}

export async function createAccount(event: SyntheticEvent): Promise<void> {
  console.log("Submitting data to /create-account");
  return await submitFormRequest(event, "/create-account");
}
