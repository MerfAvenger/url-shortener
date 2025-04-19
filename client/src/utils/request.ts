import { SyntheticEvent } from "react";
import { isFormElement } from "./is";

export default async function submitFormRequest(
  submitEvent: SyntheticEvent,
  path: string,
) {
  submitEvent.preventDefault();

  const submitTarget = submitEvent.target;

  if (isFormElement(submitTarget)) {
    const form = submitTarget;

    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());

    await fetch(path, {
      method: "POST",
      body: JSON.stringify(formObject),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert(`Request to ${path} was successful.`);
      } else {
        alert(`Request to ${path} failed.`);
      }
    });
  }
}
