// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(templateFn, parentElement, list, position = 'afterbegin', clear = false) {
  if (clear) {
    parentElement.innerHTML = '';
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

export function renderWithTemplate(template, parentElement) {
  if (!parentElement) {
    throw new Error('Unable to render template: parent element was not found.');
  }
  parentElement.innerHTML = template;
}

export async function loadTemplate(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Unable to load template "${path}": ${response.status} ${response.statusText}`);
  }
  return response.text();
}

export async function loadHeaderFooter() {
  const headerElement = qs('#main-header');
  const footerElement = qs('#main-footer');
  if (!headerElement || !footerElement) {
    throw new Error('Header and footer placeholders are required.');
  }

  const [header, footer] = await Promise.all([
    loadTemplate('/partials/header.html'),
    loadTemplate('/partials/footer.html'),
  ]);
  renderWithTemplate(header, headerElement);
  renderWithTemplate(footer, footerElement);
}