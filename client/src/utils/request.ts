import { SyntheticEvent } from "react";
import { isFormElement } from "./is";

export default async function submitFormRequest(
  submitEvent: SyntheticEvent,
  path: string,
) {
  submitEvent.preventDefault();

  const submitTarget = submitEvent.currentTarget;
  const form = submitTarget.parentElement?.closest("form");

  if (isFormElement(form)) {
    if (!form) {
      throw new Error(
        "Can't submit data from the form: could not find parent form for submit event.",
      );
    }

    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());

    console.log("Submitting data to", path, formObject);

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
