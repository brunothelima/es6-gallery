import {Component} from './Component.js';

export class Gallery extends Component {

	constructor(element) {
		super(element);
		// Creates the gallery__lens wrapper 
		this._lens = document.createElement('div');
		// Init the _items prop with the component children
		this._items = Array.from(this._element.children);
		this._currItem = 0;
		// Add the component classes for styling
		this._element.classList.add('gallery');
		this._lens.classList.add('gallery__lens');
		// init component
		this.init()
	}

	// Initialize the component
	init() {

		this.render(); // Render new component HTML
		
		// Bind prev button click to prev method
		this._element.querySelector('.gallery__prev')
			.addEventListener('click', event => {
				this.prev();
			});
		// Bind pagination button click to goTo method
		this._element.querySelectorAll('.gallery__index').forEach(index => {
			index.addEventListener('click', event => {
				this.goTo(event.target.innerText);
			});
		})
		// Bind next button click to next method
		this._element.querySelector('.gallery__next')
			.addEventListener('click', event => {
				this.next();
			});
	}
	render() {
		// Transfers the child components to gallery__lens wrapper
		this._items.map(item => {
			item.classList.add('gallery__item');
			return this._lens.appendChild(item);	
		});	
		// Append the new gallery_lens element filled with children
		this._element.appendChild(this._lens);
		// Add gallery__item--active class to the first gallery__item
		this._items[this._currItem].classList.add('gallery__item--active')
		// Render the gallery__controll elements
		this._element.insertAdjacentHTML('beforeend', `
			<div class="gallery__controlls">
				<button class="gallery__prev">Prev</button>
				${this._items.map((item, index) => {
					return `<button class="gallery__index">${index+1}</button>`
				}).join('')}
				<button class="gallery__next">Next</button>
			</div>
		`);
	}

	// Hide all _items besides _items[_currItem] 
	updateItems() {
		// Active item style class
		const activeClass = 'gallery__item--active';
		// Remove active class from all items
		this._items.map(item => item.classList.remove(activeClass))
		// Add active class to the _items[_currItem]
		this._items[this._currItem].classList.add(activeClass)
	}
	// Show previews item
	prev() {
		// Set _currItem as last item if first item is shown, set next item index
		this._currItem = (this._currItem <= 0) ? this._items.length - 1 : this._currItem - 1;
		this.updateItems();
	}
	// Show selected item[index] on pagination
	goTo(index) {
		this._currItem = index - 1;
		this.updateItems();
	}
	// Show next item
	next() {
		// Set _currItem as first item if last item is shown, set next item index
		this._currItem = (this._currItem >= (this._items.length - 1)) ? 0 : this._currItem + 1;
		this.updateItems();
	}
}