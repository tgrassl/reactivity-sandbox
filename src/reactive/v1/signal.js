let Owner = null;
let LastNode = null;

export function S(fn) {
  let node = LastNode;
  if (!node) {
    node = new Computation(fn);
    node.track();
    node.run();
  }
}

function Computation(fn) {
  function track() {
    Owner = this;
  }

  function run() {
    fn();
    LastNode = this;
  }

  return { track, run };
}

function Data(initialValue) {
  let value = initialValue;
  let pending = value;
  let owner = null;

  function current() {
    if (!owner) {
      owner = Owner;
    }

    if (pending !== value) {
      return pending;
    }

    return value;
  }

  function next(newValue) {
    if (newValue !== pending) {
      pending = newValue;

      if (owner) {
        owner.run();
      }
    }

    return newValue;
  }

  return { current, next, value };
}

export function createSignal(initialValue) {
  const node = new Data(initialValue);

  const getter = () => node.current();

  const setter = (value) => node.next(value);

  return [getter, setter];
}
