/**
 * This is a event dispatcher class. Used by the `Gallery` component 
 * to emmit custom events on user interactions with the gallery
 */
export class GalleryEvents {
	/** 
	 * Emmits a `CustomEvent` from a given element as argument
	 * @param {HTMLElement} target - Element to emmit the event
	 * @param {String} event - Event identifier for the listener
	 * @param {Object} detail - Data to be recieved by the listener
	 * @example 
	 *  // Emmiting `change` event for the element reference `el`
	 *  // passing `detail` as response for the callback function
	 *  const el = document.getElementById('el');
	 *  const detail = { selected: [10,20,30] };
	 *  GE.emmit(el, 'change', detail);
	*/
	static emmit(target = HTMLElement, event=undefined, detail = {}) {
		target.dispatchEvent(new CustomEvent(event, { detail: detail }));
	}
	/** 
	 * Sets a custom listener to `el` argument
	 * @param {HTMLElement} target - Element to recieve the listener
	 * @param {String} event - Name of the event to be listen
	 * @param {Function} callback - Callback function for the listener
	 * @example
	 *  // Setting a watcher for the `change` event 
	 *  // from element reference `el`
	 *  const el = document.getElementById('el');
	 *  GE.watch(el, 'change', (e) => {
	 *    const selected = e.detail.selected;
	 *  });
	*/
	static watch(target = HTMLElement, event=undefined, callback=undefined) {
		target.addEventListener(event, e => callback(e));
	}
}