
import { GalleryFactory as GF } from './GalleryFactory.js';
// import { GalleryEvents as GE } from './GalleryEvents.js';

/** 
 * Builder class for the `Gallery` component items list.
 * 	Responsible for wrapping all the initial loaded items in to li elements
 * 	and append then to a new ul element as the main element reference 
 * 	`click` event listeners.
 */
export class GalleryView {
	/**
	 * @param {HTMLElement[]} items - `Gallery` target initial child elements array
	 */
	constructor(items = []) {
		this.el = GF.createView(items);
		this.items = [...this.el.children];
	}
	/**
	 * * Search for the current  visible view item element reference
	 * @returns {Number} - The current disabled navigation button index
	 * @getter
	 *//**  
	 * Hide all items, except for the matched item index
	 * @param {Number} index - Index for view item to by displayed
	 * @setter
	*/
	get current() {
		const current = this.items.find(item => item.style.display === 'block');
		return this.items.indexOf(current);
	}
	set current(index = 0) {
		for (const item of this.items.values()) {
			item.style.display = (item === this.items[index]) ? 'block' : 'none';
		}
	}
}
