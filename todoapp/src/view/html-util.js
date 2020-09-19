export function escapeSpecialChars(str) {
  return str.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
}

/**
 * Creates and returns an HTML element from an HTML string.
 * @param {string} html
 */
export function htmlToElement(html) {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content.firstElementChild;
}

/**
 * Tag function that creates and returns a DOM Node from an HTML string.
 * @param {string} strings
 * @param  {...any} values
 * @return {Element}
 */
export function element(strings, ...values) {
  const htmlString = strings.reduce((result, str, i) => {
    const value = values[i - 1];
    if (typeof value === 'string') {
      return result + escapeSpecialChars(value) + str;
    } else {
      return result + String(value) + str;
    }
  });
  return htmlToElement(htmlString);
}

/**
 * Overwrite the contents of the container element with bodyElement.
 * @param {Element} bodyElement The element that is the content of the container
 *     element
 * @param {Element} containerElement Container element
 */
export function render(bodyElement, containerElement) {
  containerElement.innerHTML = '';
  containerElement.appendChild(bodyElement);
}
