export function isFormElement(
  element: EventTarget,
): element is HTMLFormElement {
  return element instanceof HTMLFormElement;
}
