/**
 * Gallery component contructor.
 * @author Bruno Lima
 * @version 0.1.0;
 */
import './Gallery.scss';
import { GalleryView } from './GalleryView.js';
import { GalleryControll } from './GalleryControll.js';

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
		this.init();
	}
	/**
	 * Initializes the controllers, append their references to the main element
	 * 	and bind the `change` event listner to the controll element
	 */
	initControlls() {
		this.ctrl.current = 0;
		this.el.appendChild(this.ctrl.el);
		this.ctrl.on('change', e => {
			this.view.current = e.detail.current;
		});
	}
	/**
	 * Initializes the gallery view for the loaded items
	 * 	and append the view reference to the main element
	 */
	initView() {
		this.view.current = 0;
		this.el.appendChild(this.view.el);
	}
	/**
	 * Initializes the `Gallery` component
	 */
	init() {
		this.el.classList.add('Gallery');
		this.initView();
		this.initControlls();
	}
}