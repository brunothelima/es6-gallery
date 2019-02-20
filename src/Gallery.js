/**
 * Gallery component contructor.
 * @author Bruno Lima
 * @version 0.1.0;
 */
import './Gallery.scss';
import { GalleryView } from './GalleryView.js';
import { GalleryControll } from './GalleryControll.js';
import { GalleryEvents as GE } from './GalleryEvents.js';
import { GalleryFactory as GF } from './GalleryFactory.js';

/**
 * This is the main class for the `Gallery` component. Its constructor build the 
 * 	elements that compose the gallery, appends them to the target element
 * 	and bind the gallery controlls element to the view element via event
 * 	listeners
 */
export class Gallery {
	/**
	 * @param {HTMLElement} target - Target element to build the new gallery
	 */
	constructor(target) {
		this.el = target;
		this.items = [...this.el.children];
		this.view = new GalleryView(this.items);
		this.ctrl = new GalleryControll(this.items.length);
		this.counter = GF.createCounter(this.items.length);
		this.init();
	}
	/**
	 * Initializes the controllers, append their references to the main element
	 * 	and bind the `change` event listner to the controll element
	 */
	initControlls() {
		this.ctrl.current = 0;
		this.el.appendChild(this.ctrl.el);
		GE.watch(this.ctrl.el, 'change', e => {
			this.view.current = e.detail.current;
			this.counter.textContent = `${e.detail.current + 1} / ${this.items.length}`;
		});
	}
	/**
	 * Initializes the gallery view for the loaded items
	 * 	and append the view reference to the main element
	 */
	initView() {
		this.view.current = 0;
		this.el.appendChild(this.view.el);
		GE.watch(this.view.el, 'swipe-left', () => this.ctrl.next());
		GE.watch(this.view.el, 'swipe-right', () => this.ctrl.prev());
	}
	/**
	 * Initializes the `Gallery` component
	 */
	init() {
		this.el.classList.add('Gallery');
		this.el.appendChild(this.counter);
		this.initView();
		this.initControlls();
	}
}