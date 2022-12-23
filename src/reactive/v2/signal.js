const context = [];

export function createSignal(value) {
  const deps = new Set();

  const read = () => {
    const running = context[context.length - 1];
    if (running) {
      deps.add(running);
      running.deps.add(deps);
    }
    return value;
  };

  const write = (nextValue) => {
    value = nextValue;

    for (const sub of [...deps]) {
      sub.execute();
    }
  };
  return [read, write];
}

function cleanup(running) {
  for (const dep of running.deps) {
    dep.delete(running);
  }
  running.deps.clear();
}

export function createEffect(fn) {
  const effect = {
    execute() {
      cleanup(effect);
      context.push(effect);
      try {
        fn();
      } finally {
        context.pop();
      }
    },
    deps: new Set()
  };

  effect.execute();
}

export function createMemo(fn) {
  const [s, set] = createSignal();
  createEffect(() => set(fn()));
  return s;
}
