import { GalleryFactory } from './GalleryFactory.js';
import { GalleryEvents } from './GalleryEvents.js';

export class GalleryControll {
	constructor(count = 0) {
		this.el = GalleryFactory.createControlls();
		this.nav = GalleryFactory.createNavigation(count);
		this.prevButton = GalleryFactory.createPrevButton();
		this.nextButton = GalleryFactory.createNextButton();
		this.navButtons = [...this.nav.children];
		this.init();
	}
	get current() {
		return this.navButtons.indexOf(this.navButtons.find(btn => !!btn.disabled));
	}
	set current(payload = 0) {
		const target = this.navButtons.find((_, index) => index === payload);
		for (const button of this.navButtons.values()) {
			button.disabled = (button === target);
		}
		GalleryEvents.dispatch(this.el, 'change', { current: this.current })
	}
	get disabled() {
		return this.navButtons[this.current];
	}
	prev() {
		const prev = this.disabled.previousElementSibling || this.nav.lastElementChild;
		this.current = this.navButtons.indexOf(prev);
		GalleryEvents.dispatch(this.el, 'prev', { current: this.current })
	}
	next() {
		const next = this.disabled.nextElementSibling || this.nav.firstElementChild;
		this.current = this.navButtons.indexOf(next);
		GalleryEvents.dispatch(this.el, 'next', { current: this.current })
	}
	on(event='', callback=null) {
		this.el.addEventListener(event, e => callback(e));
	}
	init() {
		this.prevButton.addEventListener('click', () => this.prev());
		this.nextButton.addEventListener('click', () => this.next());
		this.navButtons.map(btn => btn.addEventListener('click', e => {
			this.current = this.navButtons.indexOf(e.target);
		}));
		this.el.appendChild(this.prevButton);
		this.el.appendChild(this.nav);
		this.el.appendChild(this.nextButton);
	}
}
