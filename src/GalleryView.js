import { GalleryFactory } from './GalleryFactory.js';

export class GalleryView {
	constructor(items = []) {
		this.el = GalleryFactory.createView(items);
		this.items = [...this.el.children];
	}
	get current() {
		const current = this.items.find(item => item.style.display === 'block');
		return this.items.indexOf(current);
	}
	set current(payload = 0) {
		for (const item of this.items.values()) {
			item.style.display = (item === this.items[payload]) ? 'block' : 'none';
		}
	}
}
