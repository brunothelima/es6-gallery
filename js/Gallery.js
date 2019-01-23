export class Component {
	// Component class constructor
	constructor(element) {
		this._element = this.extractElement(element);
	}
	extractElement(element) {
		let reference;
		// Try to get a DOM reference of the el argument if it is a String
		try {
			if (element instanceof HTMLElement) {
				reference = element;
			} else if ((typeof element === 'string' || element instanceof String) && element.match('(#|.).*')) {
				// Checks if the element reference exists
				if (document.querySelector(element)) {
					reference = document.querySelector(element);
				} else {
					// Throw error if the selector match is undefined
					throw new Error(`The selector '${element}' has no element match.`);
				}
			} else {
				throw new Error('Invalid initialization selector/element')
			}
		} catch(error) {
			alert(error);
		}
		return reference;
	}
}

export class Gallery extends Component {

	constructor(element) {
		super(element);
		this._curr = 0; // Current item on display
		this._lens; // Will become gallery__lens reference
		this._items = Array.from(this._element.children) // Initial items in the component target
		this._controlls; // Will become gallery__controlls reference
		this._bullets; // Will become gallery__index bullets array
		this.init()
	}
	// Computed total of items
	get total() {
		return this._items.length;
	}
	// Hide all _items besides _items[_curr] 
	set setCurrent (curr=0) {
		// Set new value for _curr
		this._curr = curr;
		// Remove active class from all items
		this._items.map(item => item.classList.remove('gallery__item--active'));
		// Add active class to the _items[_curr]
		this._items[this._curr].classList.add('gallery__item--active');
		// Remove active class from all bullets
		this._bullets.map(item => item.classList.remove('gallery__index--active'));
		// Add active class to the _bullets[_curr + 1]
		this._bullets[this._curr + 1].classList.add('gallery__index--active');
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
	buildLens() {
		if (this._lens instanceof HTMLElement) {
			this._lens.remove();
		}
		// Wrapp items in a gallery__item div
		this._element.insertAdjacentHTML('afterbegin',`
			<div class="gallery__lens">
				${this._items.map((item, index) => {
					const html = item.className.includes('gallery__item') 
						? item.innerHTML : item.outerHTML;
					return `<div class="gallery__item">${html}</div>`;
				}).join('')}
			</div>`);
		
		// Set _lens as reference of the new rendered lens
		this._lens = document.querySelector('.gallery__lens');
		// Set _items as array of childrens in _lens
		this._items = Array.from(this._lens.children);
	}
	// Render the gallery__controll elements and bind navigation events
	buildPagination() {
		if (this._controlls instanceof HTMLElement) {
			this._controlls.remove();
		}
		// Render the gallery__controll HTML template
		this._element.insertAdjacentHTML('beforeend', `
			<div class="gallery__controlls">
				<button class="gallery__prev">Prev</button>
				${this._items.map((item, index) => {
					return `<button class="gallery__index">${index+1}</button>`;
				}).join('')}
				<button class="gallery__next">Next</button>
			</div>
		`);

		// Set _controlls as reference of the new rendered controlls
		this._controlls = document.querySelector('.gallery__controlls');
		// Set _bullets as array of buttons avaliabe on the _controlls
		this._bullets = Array.from(this._controlls.children);
		// Activate last seen item before update
		this.setCurrent = this._curr;
		// Bind prev button click to prev method
		this._controlls.querySelector('.gallery__prev').addEventListener('click', _ => this.prev());
		// Bind next button click to next method
		this._controlls.querySelector('.gallery__next').addEventListener('click', _ => this.next());
		// Bind pagination button click to goTo method
		for(const item of this._controlls.querySelectorAll('.gallery__index')) {
			item.addEventListener('click', event => this.goTo(event.target.innerText));
		}
		// Observer object for _lens content, updates on inserte/remove items
		const obs = new MutationObserver((mutations, observer) => {
			observer.disconnect(); // Disconnects the observer
			// Set _items with the new/deleted items
			this._items = Array.from(this._lens.children);
			this.update(); // Update the view
		})
		// Call the observer callback on any changes in _lens content
		obs.observe(this._lens, {childList: true});
	}
	// Update _items array and reload the pagination controlls 
	update() {		
		this.buildLens();
		this.buildPagination();
	}
	// Creates a wrapper for every item on the list
	init() {
		// Add the component classes for styling
		while(this._element.firstChild) {
			this._element.removeChild(this._element.firstChild);
		}
		this._element.classList.add(...['gallery','gallery--active']);
		// Transfers the child components to gallery__lens wrapper
		this.update();
	}
}