/**
 * This is a factory class for all the HTMLElements
 * 	used by the `Gallery` component.
 */
export class GalleryFactory {
	/**
	 * Creates a new previous button element for the `Gallery` controllers
	 * @return {HTMLButtonElement} The created button element
	 */
	static createPrevButton() {
		const button = document.createElement('button');
		button.textContent = 'Previews';
		button.className = 'Gallery__prev';
		return button;
	}
	/**
	 * Creates a new next button element for the `Gallery` controllers
	 * @return {HTMLButtonElement} The created button element
	 */
	static createNextButton() {
		const button = document.createElement('button');
		button.textContent = 'Next';
		button.className = 'Gallery__next';
		return button;
	}
	/**
	 * Creates a direct navigation button for the `Gallery` navigation
	 * @param {Number} index - Number to display in the button
	 * @return {HTMLButtonElement} The created button element
	 */
	static createNavButton(index = 1) {
		const button = document.createElement('button');
		button.textContent = index;
		button.className = 'Gallery__index';
		return button;
	}
	/**
	 * Creates a wrapper filled with navigation buttons
	 * @param {Number} range - Number of buttons to create
	 * @return {HTMLElement} The created nav element
	 */
	static createNavigation(range = 1) {
		const nav = document.createElement('nav');
		nav.className = 'Gallery__nav';
		while (nav.children.length < range) {
			const index = nav.children.length + 1;
			const button = this.createNavButton(index);
			nav.appendChild(button);
		}
		return nav;
	}
	/**
	 * Creates the controll buttons wrapper
	 * @return {HTMLDivElement} The created div element
	 */
	static createControlls() {
		const controlls = document.createElement('div');
		controlls.className = 'Gallery__controlls';
		return controlls;
	}
	/**
	 * Creates a view item wrapper
	 * @param {HTMLElement} context - The element to be wrapped
	 * @return {HTMLLIElement} The created li element
	 */
	static createViewItem(context = HTMLElement) {
		const item = document.createElement('li');
		item.className = 'Gallery__item';
		item.appendChild(context);
		return item;
	}
	/**
	 * Creates a list to wrapp the loaded view elements
	 * @param {HTMLElement[]} items - List of elements to be wrapped
	 * @return {HTMLUListElement} The created ul element
	 */
	static createView(items = []) {
		const view = document.createElement('ul');
		view.className = 'Gallery__view';
		for (let item of items.values()) {
			const li = this.createViewItem(item);
			view.appendChild(li);
		}
		return view;
	}
}