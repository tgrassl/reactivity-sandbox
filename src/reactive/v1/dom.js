import { S } from "./signal";

export const element = (type) => document.createElement(type);
export const text = (text) => document.createTextNode(text);
export const insert = (parent, value, marker) => {
  if (typeof value === "function") {
    S(() => nodeInsert(parent, value(), marker));
  } else {
    nodeInsert(parent, value, marker);
  }
};

const MARKER_SYMBOL = Symbol();

const nodeInsert = (parent, value, marker) => {
  const nodes = [...parent.childNodes];
  if (typeof value === "string" || typeof value === "number") {
    const currentNode = nodes.find((node) => node[MARKER_SYMBOL] === marker);
    if (currentNode) {
      const text = currentNode;
      text.data = value;
    } else {
      const element = text(value);
      element[MARKER_SYMBOL] = marker;
      parent.appendChild(element);
    }
  }
};
