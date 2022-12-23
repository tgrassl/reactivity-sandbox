import { createSignal } from "./signal";
import { element, insert } from "./dom";

export function Counter() {
  // component logic
  const [counter, setCounter] = createSignal(1);
  const increment = () => setCounter(counter() + 1);

  // template
  const button = element("button");
  insert(button, "Count: ", 0);
  insert(button, counter, 1);
  button.addEventListener("click", increment);
  return button;
}
