import { GalleryFactory } from './GalleryFactory.js';
import { GalleryEvents } from './GalleryEvents.js';

/** 
 * This class creates the navigation elements for a `Gallery` component.
 * Create each of the designed buttons via `GalleryFactory` and
 * 	binds the click event listners to them, passing their respective methods
 *  as callback function.
 */
export class GalleryControll {
	/** 
	 * @param {Number} range - Range of loaded items to controll
	 */
	constructor(range = 0) {
		this.el = GalleryFactory.createControlls();
		this.nav = GalleryFactory.createNavigation(range);
		this.prevButton = GalleryFactory.createPrevButton();
		this.nextButton = GalleryFactory.createNextButton();
		this.navButtons = [...this.nav.children];
		this.init();
	}
	/**  
	 * Getter for he current disabled navigation button index.
	 */
	get current() {
		return this.navButtons.indexOf(this.navButtons.find(btn => !!btn.disabled));
	}
	/**  
	 * Setter for the current disabled navigation button index.
	 * @param {Number} index - Index for the navigation button to be disabled 
	*/
	set current(index = 0) {
		for (const [key, button] of this.navButtons.entries()) {
			button.disabled = (key === index);
		}
		GalleryEvents.dispatch(this.el, 'change', { current: this.current });
	}
	/**  
	 * Carries the current disabled button element reference
	*/
	get disabled() {
		return this.navButtons[this.current];
	}
	/** 
	 * Set `current` as the disabled button previous element index
	 * 	and emmits the `prev` event via `GalleryEvents` method
	*/
	prev() {
		const prev = this.disabled.previousElementSibling || this.nav.lastElementChild;
		this.current = this.navButtons.indexOf(prev);
		GalleryEvents.dispatch(this.el, 'prev', { current: this.current });
	}
	/** 
	 * Set `current` as the disabled button next element index
	 * 	and emmits the `prev` event via `GalleryEvents` `dispatch` method
	*/
	next() {
		const next = this.disabled.nextElementSibling || this.nav.firstElementChild;
		this.current = this.navButtons.indexOf(next);
		GalleryEvents.dispatch(this.el, 'next', { current: this.current });
	}
	/** 
	 * Sets a custom listener to the main element
	 * @param {String} event - Event name to be listen
	 * @param {Function} callback - Callback of the emmited event
	*/
	on(event=undefined, callback=undefined) {
		this.el.addEventListener(event, e => callback(e));
	}
	/** 
	 * Bind listeners to the navigation button elements 
	 * 	and appends the buttons to the main element
	*/
	init() {
		// Binding navigation buttons listeners to their callbacks
		this.prevButton.addEventListener('click', () => this.prev());
		this.nextButton.addEventListener('click', () => this.next());
		this.navButtons.map(btn => btn.addEventListener('click', e => {
			this.current = this.navButtons.indexOf(e.target);
		}));
		// Appending navigation buttons to the main element
		this.el.appendChild(this.prevButton);
		this.el.appendChild(this.nav);
		this.el.appendChild(this.nextButton);
	}
}
