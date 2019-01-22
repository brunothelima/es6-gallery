import {Component} from './Component.js';

export class Gallery extends Component {

	constructor(element) {
		super(element);
		// Current item on display
		this._curr = 0;
		// Creates the gallery__lens wrapper 
		this._lens = document.createElement('div');
		// Init the _items prop with the component children
		this._items = Array.from(this._element.children)
		// init component
		this.init()
	}
	// Computed total of items
	get total() {
		return this._items.length;
	}
	// Hide all _items besides _items[_curr] 
	set setCurrent (curr=0) {
		// Active item style class
		const activeClass = 'gallery__item--active';
		// Set new value for _curr
		this._curr = curr;
		// Remove active class from all items
		this._items.map(item => item.classList.remove(activeClass));
		// Add active class to the _items[_curr]
		this._items[this._curr].classList.add(activeClass);
	}
	// Set _curr as last item if first item is shown, set next item index
	prev() {
		this.setCurrent = (this._curr <= 0) ? this.total - 1 : this._curr - 1;
	}
	// Show selected item[index] on pagination
	goTo(index) {
		this.setCurrent = index - 1;
	}
	// Set _curr as first item if last item is shown, set next item index
	next() {
		this.setCurrent = (this._curr >= (this.total - 1)) ? 0 : this._curr + 1;
	}
	// Update _items array and reload the pagination controlls 
	update() {
		this._items = Array.from(this._lens.children);
		// Set current item visible
		this._items[this._curr].classList.add('gallery__item--active');
		this.buildPagination();
	}
	insert(items) {
		if (items instanceof HTMLElement) {
			items = [items];
		}
		// Wrapp items in a gallery__item div
		this._lens.innerHTML += items.map((item, index) => {
			item.remove();
			return `<div class="gallery__item">${item.outerHTML}</div>`;
		}).join('');
		// Update vars and controlls
		this.update();
	}
	// Render the gallery__controll elements and bind navigation events
	buildPagination() {
		if (this._element.querySelector('.gallery__controlls')) {
			this._element.querySelector('.gallery__controlls').remove();
		}
		// Render the gallery__controll HTML template
		this._element.insertAdjacentHTML('beforeend', `
			<div class="gallery__controlls">
				<button class="gallery__prev">Prev</button>
				${this._items.map((item, index) => {
					return `<button class="gallery__index">${index+1}</button>`
				}).join('')}
				<button class="gallery__next">Next</button>
			</div>
		`);
		// Bind prev button click to prev method
		this._element.querySelector('.gallery__prev').addEventListener('click', _ => this.prev());
		// Bind next button click to next method
		this._element.querySelector('.gallery__next').addEventListener('click', _ => this.next());
		// Bind pagination button click to goTo method
		for(let item of this._element.querySelectorAll('.gallery__index')) {
			item.addEventListener('click', _ => this.goTo(event.target.innerText));
		}
	}
	// Creates a wrapper for every item on the list
	init() {
		// Add the component classes for styling
		this._element.classList.add('gallery');
		// Append the new gallery_lens element filled with children
		this._lens.classList.add('gallery__lens');
		this._element.appendChild(this._lens);
		// Transfers the child components to gallery__lens wrapper
		this.insert(this._items);
	}
}