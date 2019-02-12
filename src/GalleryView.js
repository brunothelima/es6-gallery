import { GalleryFactory } from './GalleryFactory.js';

/**
 * This class create list wrapper for the `Gallery` loaded items,
 * 	and controlls the items that should be displayed/hidden
 */
export class GalleryView {
	/**
	 * @param {Array} items - `Gallery` component loaded items
	 */
	constructor(items = []) {
		this.el = GalleryFactory.createView(items);
		this.items = [...this.el.children];
	}
	/**  
	 * Getter for he current displayed item index
	 */
	get current() {
		const current = this.items.find(item => item.style.display === 'block');
		return this.items.indexOf(current);
	}
	/**  
	 * Setter for the current item to be displayed
	 * @param {Number} index - Index for view item to by displayed
	*/
	set current(index = 0) {
		for (const item of this.items.values()) {
			item.style.display = (item === this.items[index]) ? 'block' : 'none';
		}
	}
}