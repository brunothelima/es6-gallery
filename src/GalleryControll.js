import { GalleryFactory as GF } from './GalleryFactory.js';
import { GalleryEvents as GE } from './GalleryEvents.js';

/** 
 * Builder class for the `Gallery` component navigation controlls.
 * 	Responsible for the creation of all controll elements via`GalleryFactory`
 * 	and also the binding of its methods as callback for the created elements 
 * 	`click` event listeners.
 */
export class GalleryControll {
	/** 
	 * @param {Number} count - Count of items loaded by the `Gallery` component
	 */
	constructor(count = 0) {
		this.el = GF.createControlls();
		this.nav = GF.createNavigation(count);
		this.prevButton = GF.createPrevButton();
		this.nextButton = GF.createNextButton();
		this.navButtons = [...this.nav.children];
		this.init();
	}
	/**
	 * Search for the current disabled navigation button reference
	 * @returns {Number} - The current disabled navigation button index
	 * @getter
	 *//**
	 * Disable all buttons, except for the matched button index
	 * @param {Number} index - Index for the navigation button to be disabled 
	 * @fires GalleryControll#change
	 * @setter
	*/
	get current() {
		return this.navButtons.indexOf(this.navButtons.find(btn => !!btn.disabled));
	}
	set current(index = 0) {
		for (const [key, button] of this.navButtons.entries()) {
			button.disabled = (key === index);
		}
		this.nav.style.setProperty('--tx', index - 1);
		GE.emmit(this.el, 'change', { current: this.current });
	}
	/**  
	 * Get The current disabled button element reference in `navButtons` array
	 * @return {HTMLButtonElement} - The button element reference
	 * @getter
	*/
	get disabled() {
		return this.navButtons[this.current];
	}
	/** 
	 * Set `current` as the disabled button previous element index
	 * 	and emmits the `prev` event for listeners  via `GalleryEvents`.
	 * @fires GalleryControll#prev
	 */
	prev() {
		const prev = this.disabled.previousElementSibling || this.nav.lastElementChild;
		this.current = this.navButtons.indexOf(prev);
	}
	/** 
	 * Set `current` as the next button previous element index
	 * 	and emmits the `next` event for listeners  via `GalleryEvents`
	 *  @fires GalleryControll#next
	*/
	next() {
		const next = this.disabled.nextElementSibling || this.nav.firstElementChild;
		this.current = this.navButtons.indexOf(next);
	}
	/** 
	 * Bind listeners to each of the navigation button elements
	 * 	and appends the created elements to the controlls wrapper element
	*/
	init() {
		// Binding navigation buttons listeners to their callbacks
		GE.watch(this.prevButton, 'click', () => this.prev());
		GE.watch(this.nextButton, 'click', () => this.next());
		this.navButtons.map(btn => GE.watch(btn, 'click', e => {
			this.current = this.navButtons.indexOf(e.target);
		}));
		// Appending navigation buttons to the main element
		this.el.appendChild(this.prevButton);
		this.el.appendChild(this.nav);
		this.el.appendChild(this.nextButton);
	}
}
