import { GalleryView } from './GalleryView.js';
import { GalleryControll } from './GalleryControll.js';

/** 
 * Contructor class for a new gallery controll component
 */
export class Gallery {
	/**
	 * @param {HtmlElement} target - Target element to recieve the gallery component 
	 */
	constructor(target) {
		this.target = target;
		this.items = [...this.target.children];
		this.view = new GalleryView(this.items);
		this.controlls = new GalleryControll(this.items.length);
		this.init();
	}
	init() {
		this.target.appendChild(this.view);
		this.target.appendChild(this.controlls);
	}
}