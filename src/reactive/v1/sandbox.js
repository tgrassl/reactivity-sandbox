import { createSignal, S } from "./signal";

const [name, setName] = createSignal("Harry");
const [age, setAge] = createSignal(23);
const [lastName, setLastName] = createSignal("Potter");

// S(() => console.log("Name", name(), lastName()));

S(() => {
  console.log("foo", age());
  S(() => {
    console.log("bar", name());
    S(() => {
      console.log("baz", lastName());
    });
  });
});

setAge(40);

setTimeout(() => setLastName("granger"), 2000);
setTimeout(() => setName("Peter"), 6000);
