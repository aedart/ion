/**
 * Sets the text content of an element by ID
 *
 * @param {string} id
 * @param {string} text
 *
 * @returns {boolean}
 */
export function setElementText(id: string, text: string): boolean
{
    const el = document.getElementById(id);
    if (el) {
        el.textContent = text;
        return true;
    }
    return false;
}
