import './Gallery.scss';
import { GalleryView } from './GalleryView.js';
import { GalleryControll } from './GalleryControll.js';

export default class {
	constructor(target) {
		this.el = target;
		this.items = [...this.el.children];
		this.view = new GalleryView(this.items);
		this.ctrl = new GalleryControll(this.items.length);
		this.init();
	}
	initControlls() {
		this.ctrl.current = 0;
		this.el.appendChild(this.ctrl.el);
		this.ctrl.on('change', e => {
			this.view.current = e.detail.current;
		});
	}
	initView() {
		this.view.current = 0;
		this.el.appendChild(this.view.el);
	}
	init() {
		this.el.classList.add('Gallery');
		this.initView();
		this.initControlls();
	}
}