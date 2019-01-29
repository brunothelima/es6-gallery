/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
/*
	Validate the existence of the element and
	returns the element reference
*/
function extractElement(target) {
	try {
		if (target instanceof HTMLElement) {
			return target;
		} else if (typeof target === 'string' || target instanceof String) {
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
	Gallery Component;
	Creates an slider of elements with pagination and controlls
*/
export default class {
	/*
		Gallery component contructor
		Inherit $element from Component class
  */
	constructor(target) {
		this.$element = extractElement(target); // Target element
		this.$list; // Will become gallery__list element reference
		this.$ctrls; // Will become gallery__ctrls element reference
		this.$prev; // Will become gallery__prev element reference
		this.$next; // Will become gallery__next reference
		this._current = 0; // currentent visible item index 
		this._buttons; // Will become gallery__index iterable
		this._items = [...this.$element.children] || []; // Itens to display iterable
		this.render();
	}
	/*
		Getter for total items entries
	*/
	get total() {
		return this._items.length;
	}
	/*
		Sets the currentent item to be displayed
		@current: Item index
	*/
	set current (current=0) {
		// Set the new value for _current
		this._current = current;
		/*
			Remove active class from all items
			Then adds active class to the currentent item to be displayed
		*/
		this._items.map(item => item.style.display = 'none');
		this._items[this._current].style.display = 'block';
		/* 
			Remove active class from all bullets
			Then adds active class to the currentent bullet to be hightlighted
		*/
		this._buttons.map(item => item.disabled = false);
		this._buttons[this._current].disabled = true;
	}
	/*
		Set the previews element to be displayed
		Used as callback for the galler__prev buttom @click event
	*/
	prev() {
		/*
			Iterates over _current
			Returns last _item index if _current was the first item availble
		*/
		this.current = this._current <= 0 ? this.total - 1 : this._current - 1;
	}
	/*
		Set the selected element to be displayed
		Used as callback for the galler__index buttom @click event
	*/
	goTo(index) {
		this.current = index;
	}
	/*
		Set the next element to be displayed
		Used as callback for the galler__prev buttom @click event
	*/
	next() {
		/*
			Iterates over _current
			Returns first _item index if _current was the last item availble
		*/
		this.current = this._current >= (this.total - 1) ? 0 : this._current + 1;
	}
	// Insert new elements to the $list element
	insert(elements=[]) {
		try {
			// Grants that elements is an arrayh
			elements = (!Array.isArray(elements)) ? [elements] : elements;
			if (!elements.every(element => element instanceof HTMLElement)) {
				throw 'The arguments passed for insert(elements) must be an HTMLElement object/list';
			}
			/*
				Append each element passed as argument to the $list element
				Which triggers the mutation observer on the $list element
			*/
			for(const element of elements) {
				this.$list.appendChild(element);
			}
		} catch(error) {
			throw new Error(error);
		}
	}
	/*
		Render gallery__list element into the component;
		Update $list reference
		Update _items elements list
	*/
	renderList() {	
		// Insert gallery__list html into the component
		this.$element.insertAdjacentHTML('afterbegin', `
			<div class="gallery__list">
				${this._items.map(item => {  
					/*
						Iteration over _items, render each item html into gallery__list
						Retrive innerHTML for allread rendered elements and outerHTML for new elements
					*/
					const html = (item.className.includes('gallery__item')) 
						? item.innerHTML : item.outerHTML;
					return `<div class="gallery__item">${html}</div>`;
				}).join('')}
			</div>`);
		/*
			Set _List reference to the new rendered gallery__list
			Set _items as list of new gallery__items rendered
		*/
		this.$list = document.querySelector('.gallery__list');
		this._items = [...this.$list.children];
		/*
			Observer object for $list element
			Update the component html on any update on gallery__list content
		*/
		const mo = new MutationObserver((mutations, observer) => {
			// Disconnects the observer to prevent infinite loop
			observer.disconnect();
			// Update _items with new/deleted content
			this._items = [...this.$list.children];
			// Re-render the component view
			this.render(); 
		});
		// Initialize $list obervation
		mo.observe(this.$list, {childList: true});
	}
	/*
		Render gallery__ctrls element into the component;
		Bind events to the controll bullets
		Update controll elements reference ($ctrls, _buttons, $next, $prev)
		Set observer for any changes on gallery__list content
	*/
	renderCtrls() {
		// Insert gallery__list html into the component
		this.$element.insertAdjacentHTML('beforeend', `
			<div class="gallery__ctrls">
				<button class="gallery__prev">Prev</button>
				${this._items.map((item, index) => { // Iteration over _items, renders bullets relative to gallery__index indexes
					return `<button class="gallery__index">${index+1}</button>`;
				}).join('')}
				<button class="gallery__next">Next</button>
			</div>
		`);
		// Set _controlls as reference for the updated gallery__ctrls element
		this.$ctrls = document.querySelector('.gallery__ctrls');
		// Extract $ctrls buttons as iterable $ctrls children.
		this._buttons = [...this.$ctrls.children];
		/*
			Remove gallery__prev button from _buttons iterable, Set $prev as the its reference
			Bind $prev click event to the prev() method
		*/
		this.$prev = this._buttons.shift();
		this.$prev.addEventListener('click', () => this.prev());
		/*
			Remove gallery__next button from _buttons iterable, Set $next as the its reference
			Bind $next click event to the next() method
		*/
		this.$next = this._buttons.pop();
		this.$next.addEventListener('click', () => this.next());
		// Bind click event for each bullet element
		for(const [index, item] of this._buttons.entries()) {
			item.addEventListener('click', () => this.goTo(index));
		}
		/*
			Set _current as the last active item before the render
			Reset _current to the first item if item index is undefined
		*/
		this.goTo(0);
	}
	/*
		Updates the component html
	*/
	render() {
		try {
			// Checks if there is child elements for the gallery initialization
			if (!this._items.length) {
				throw `<target> element must have at least one children.`;
			}
			// Clear the target content
			this.$element.innerHTML = ``;
			/*
				Render List wrapper and ctrls.
				Must be in this order to work properly
			*/
			this.renderList(); // Render $list element
			this.renderCtrls(); // Render $ctrls element
		} catch(error) {
			throw new Error(error);
		}
	}
}