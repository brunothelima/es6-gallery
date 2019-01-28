/*eslint no-console: ["error", { allow: ["warn", "error"] }] */

/*
	Gallery Component;
	Creates an slider of elements with pagination and controlls
*/
export default class {
	/*
		Gallery component contructor
		Inherit $element from Component class
  */
	constructor(target) {
		this._curr = 0; // Current visible item index 
		this._items = []; // Itens to display iterable
		this._bullets; // Will become gallery__index iterable
		this.$element = {}; // Target element
		this.$lens; // Will become gallery__lens element reference
		this.$controlls; // Will become gallery__controlls element reference
		this.$prev; // Will become gallery__prev element reference
		this.$next; // Will become gallery__next reference
		this.init(target);
	}
	/*
		Validate the existence of the element and
		returns the element reference
	*/
	extractElement(target) {
		try {
			if (target instanceof HTMLElement) {
				return target;
			} else if ((typeof target === 'string' || target instanceof String) && target.match('(#|.).*')) {
				// Checks if the element reference exists
				if (document.querySelector(target)) {
					return document.querySelector(target);
				} else {
					// Throw error if the selector match is undefined
					throw `The selector '${target}' has no element match.`;
				}
			} else {
				throw 'Invalid initialization selector/element';
			}
		} catch(error) {
			throw new Error(error);
		}
	}
	/*
		Getter for total items entries
	*/
	get total() {
		return this._items.length;
	}
	/*
		Sets the current item to be displayed
		@curr: Item index
	*/
	set currentIndex (curr=0) {
		// Set the new value for _curr
		this._curr = curr;
		/*
			Remove active class from all items
			Then adds active class to the current item to be displayed
		*/
		this._items.map(item => item.style.display = 'none');
		this._items[this._curr].style.display = 'block';
		/* 
			Remove active class from all bullets
			Then adds active class to the current bullet to be hightlighted
		*/
		this._bullets.map(item => item.disabled = false);
		this._bullets[this._curr].disabled = true;
	}
	/*
		Set the previews element to be displayed
		Used as callback for the galler__prev buttom @click event
	*/
	prev() {
		/*
			Iterates over _curr
			Returns last _item index if _curr was the first item availble
		*/
		this.currentIndex = this._curr <= 0 ? this.total - 1 : this._curr - 1;
	}
	/*
		Set the selected element to be displayed
		Used as callback for the galler__index buttom @click event
	*/
	goTo(index) {
		this.currentIndex = index;
	}
	/*
		Set the next element to be displayed
		Used as callback for the galler__prev buttom @click event
	*/
	next() {
		/*
			Iterates over _curr
			Returns first _item index if _curr was the last item availble
		*/
		this.currentIndex = this._curr >= (this.total - 1) ? 0 : this._curr + 1;
	}
	// Insert new elements to the $lens element
	insert(elements=[]) {
		try {
			// Grants that elements is an arrayh
			elements = (!Array.isArray(elements)) ? [elements] : elements;
			if (!elements.every(element => element instanceof HTMLElement)) {
				throw 'The arguments passed for insert(elements) must be an HTMLElement object/list';
			}
			// Append each element passed as argument to the $lens element
			for(const element of elements) {
				this.$lens.appendChild(element);
			}
		} catch(error) {
			throw new Error(error);
		}
	}
	/*
		Render gallery__lens element into the component;
		Update $lens reference
		Update _items elements list
	*/
	renderLens() {	
		// Remove the current rendered gallery__lens element
		if (this.$lens) this.$lens.remove();

		// Insert gallery__lens html into the component
		this.$element.insertAdjacentHTML('afterbegin', `
			<div class="gallery__lens">
				${this._items.map(item => {  
					/*
						Iteration over _items, render each item html into gallery__lens
						Retrive innerHTML for allread rendered elements and outerHTML for new elements
					*/
					const html = (item.className.includes('gallery__item')) ? item.innerHTML : item.outerHTML;
					return `<div class="gallery__item">${html}</div>`;
				}).join('')}
			</div>`);
		// Set _lens reference to the new rendered gallery__lens
		this.$lens = document.querySelector('.gallery__lens');
		// Set _items as new gallery__items rendered
		this._items = [...this.$lens.children];
	}
	/*
		Render gallery__controlls element into the component;
		Bind events to the controll bullets
		Update controll elements reference ($controlls, _bullets, $next, $prev)
		Set observer for any changes on gallery__lens content
	*/
	renderControlls() {
		// Remove the current rendered gallery__controlls element
		if (this.$controlls) this.$controlls.remove();
		// Insert gallery__lens html into the component
		this.$element.insertAdjacentHTML('beforeend', `
			<div class="gallery__controlls">
				<button class="gallery__prev">Prev</button>
				${this._items.map((item, index) => { // Iteration over _items, renders bullets relative to gallery__index indexes
					return `<button class="gallery__index">${index+1}</button>`;
				}).join('')}
				<button class="gallery__next">Next</button>
			</div>
		`);
		// Set _controlls as reference for the updated gallery__controlls element
		this.$controlls = document.querySelector('.gallery__controlls');
		// Extract $controlls buttons as iterable $controlls children.
		this._bullets = [...this.$controlls.children];
		// Remove gallery__prev button from _bullets iterable, Set $prev as the its reference
		this.$prev = this._bullets.shift();
		// Bind $prev click event to the prev() method
		this.$prev.addEventListener('click', () => this.prev());
		// Remove gallery__next button from _bullets iterable, Set $next as the its reference
		this.$next = this._bullets.pop();
		// Bind $next click event to the next() method
		this.$next.addEventListener('click', () => this.next());
		/*
			Iterates over _bullets;
			Bind click event for each bullet element
		*/
		for(const [index, item] of this._bullets.entries()) {
			item.addEventListener('click', () => this.goTo(index));
		}
		/*
			Set _curr as the last active item before the render
			Reset _curr to the first item if item index is undefined
		*/
		this.currentIndex = (this._curr <= (this.total-1)) ? this._curr : 0;
		/*
			Observer object for $lens element
			Update the component html on any update on gallery__lens content
		*/
		const mo = new MutationObserver((mutations, observer) => {
			// Disconnects the observer to prevent infinite loop
			observer.disconnect();
			// Update _items with new/deleted content
			this._items = [...this.$lens.children];
			// Re-render the component view
			this.render(); 
		});
		// Initialize $lens obervation
		mo.observe(this.$lens, {childList: true});
	}
	/*
		Updates the component html
	*/
	render() {		
		try {
			// Checks if there is child elements for the gallery initialization
			if (!this._items.length) {
				throw `No child elements found on gallery instace $target.`;
			}
			this.renderLens(); // Render $lens element
			this.renderControlls(); // Render $controlls element
		} catch(error) {
			throw new Error(error);
		}
	}
	/*
		Initializes _items
		Render $lens and controlls 
	*/
	init(target) {
		// Extracts element target form reference or selector passed as argument o new Gallery()
		this.$element = this.extractElement(target);
		// Set _items with the inital child elements of target
		this._items = [...this.$element.children] || [];
		// Remove all childs from target after assign then to _items
		while(this.$element.firstChild) {
			this.$element.removeChild(this.$element.firstChild);
		}
		// Adds style and activation classes to the component
		// this.$element.classList.add('gallery','gallery--active');
		// Transfers the child components to gallery__lens wrapper
		this.render();
	}
}