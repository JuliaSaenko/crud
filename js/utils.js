'use strict';

function hideSection(section) {
  section.classList.remove('visible');
}

function showSection(section) {
  section.classList.add('visible');
}

function renderElement(tag, className, text) {
  let element = document.createElement(tag);
  element.setAttribute('class', className);
  element.textContent = text;

  return element
}
