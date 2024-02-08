
  /**
   * 
   * @param {HTMLElement} node Html element
   * @param {string} text Text to be copied
   * @returns {import("svelte/action").ActionReturn<string>}
   */
  export function copy(node, text) {
    /** @param {MouseEvent} e */
    const onClick = (e)=> console.log(text)

    document.addEventListener('click',onClick);

    return {
      destroy: ()=> document.removeEventListener('click', onClick)
    }
  } 