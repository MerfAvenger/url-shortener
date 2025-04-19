import { SyntheticEvent } from "react";
import { isFormElement } from "./is";

export default async function submitFormRequest(
  submitEvent: SyntheticEvent,
  path: string,
): Promise<unknown> {
  submitEvent.preventDefault();

  const submitTarget = submitEvent.currentTarget;
  const form = submitTarget.parentElement?.closest("form");

  if (isFormElement(form)) {
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());

    console.log("Submitting data to", path, formObject);

    return await fetch(path, {
      method: "POST",
      body: JSON.stringify(formObject),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      if (response.ok) {
        console.log(`Request to ${path} was successful.`);
      } else {
        console.error(`Request to ${path} failed.`);
      }

      return await response.json();
    });
  }

  throw new Error(
    "Can't submit data from the form: submit event is not from within a form element.",
  );
}
