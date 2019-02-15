
import { GalleryFactory as GF } from './GalleryFactory.js';
import { GalleryEvents as GE } from './GalleryEvents.js';
/** 
 * Builder class for the `Gallery` component items list.
 * 	Responsible for wrapping all the initial loaded items in to li elements,
 * 	therfore appending then to the view main element
 */
export class GalleryView {
	/**
	 * @param {HTMLElement[]} items - `Gallery` target initial child elements array
	 */
	constructor(items = []) {
		this.touch = null;
		this.el = GF.createView(items);
		this.items = [...this.el.children];
		this.init();
	}
	/**
	 * Handler method for the touch/mouse start/down user interactios
	 * @param {Event} e - The touchstart/mousedown event
	 */
	onTouchStart(e) {
		this.touch = (e.touches) ? e.touches[0].clientX : e.clientX;
	}
	/**
	 * Handler method for the touch/mouse move user interactios
	 * @param {Event} e - The touchsmove/mousemove event
	 * @fires GalleryView#swipe
	 */
	onTouchMove(e) {
		if (!this.touch) {
			return;
		}
		const move = (e.touches) ? e.touches[0].clientX : e.clientX;
		const swipe = ((this.touch - move) > 0) ? 'swipe-left' : 'swipe-right';
		this.touch = null;
		GE.emmit(this.el, swipe);
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
	/**
	 * 
	 */
	init() {
		GE.watch(this.el, 'touchstart', e => this.onTouchStart(e));
		GE.watch(this.el, 'touchmove', e => this.onTouchMove(e));
		GE.watch(this.el, 'mousedown', e => this.onTouchStart(e));
		GE.watch(this.el, 'mousemove', e => this.onTouchMove(e));
	}
}