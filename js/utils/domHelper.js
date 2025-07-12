export const getDocumentByQuerySelector = (selector) =>
  document.querySelector(selector);

export const createElWithClassName = (tag, className) => {
  const el = document.createElement(tag);
  el.className = className;

  return el;
};

export const createBtn = (content, className, callback) => {
  const btn = createElWithClassName('button', className);
  btn.innerText = content;
  btn.addEventListener('click', callback);

  return btn;
};

export const appendChildsToParent = (childs, parent) => {
  if (!parent) return;

  if (!Array.isArray(childs)) {
    childs = [childs];
  }

  childs.forEach((child) => parent.appendChild(child));
};

export const addClassToEl = (el, className) => el.classList.add(className);

export const removeClassFromEl = (el, className) =>
  el.classList.remove(className);

export const createElWithClassNameAndText = (tag, className, text) => {
  const el = createElWithClassName(tag, className);
  el.innerText = text;

  return el;
};
