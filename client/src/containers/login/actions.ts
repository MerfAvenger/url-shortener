import React, { SyntheticEvent } from "react";
import submitFormRequest from "../../utils/request";

export async function login(event: SyntheticEvent): Promise<void> {
  return await submitFormRequest(event, "/login");
}

export async function createAccount(event: SyntheticEvent): Promise<void> {
  return await submitFormRequest(event, "/create-account");
}
