import { createSignal, createEffect } from "./signal";

const [name, setName] = createSignal("Harry");
const [age, setAge] = createSignal(23);
const [lastName, setLastName] = createSignal("Potter");

// createEffect(() => console.log("Name", name(), lastName()));

createEffect(() => {
  createEffect(() => {
    console.log("bar", name());
    createEffect(() => {
      console.log("baz", lastName());
    });
  });
  console.log("foo", age());
});

setAge(40);

setTimeout(() => setLastName("granger"), 2000);
setTimeout(() => setName("Peter"), 6000);
