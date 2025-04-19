export function isFormElement(
  element?: EventTarget | null,
): element is HTMLFormElement {
  return element instanceof HTMLFormElement;
}
