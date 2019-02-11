/** 
 * Factory function for GalleryPrevButton elements 
 * @return {HTMLButtonElement} The created button element
 */
const createPrevButton = () => {
	const button = document.createElement('button');
	button.textContent = 'Previews';
	button.className = 'Gallery__prev'; 
	return button;
};
/** 
 * Factory function for GalleryNextButton elements
 * @return {HTMLButtonElement} The created button element
 */
const createNextButton = () => {
	const button = document.createElement('button');
	button.textContent = 'Next';
	button.className = 'Gallery__next';
	return button;
};
/** 
 * Factory function for GalleryNavButton elements
 * @param {Number} index - Correspondent gallery item index 
 * @return {HTMLButtonElement} The created button element
 */
function createNavButton(index=1) {
	const button = document.createElement('button');
	button.textContent = index;
	button.className = 'Gallery__index';
	return button;
}
/** 
 * Factory for GalleryNavigation elements
 * @param {Number} range - Number of nav buttons to generate
 * @return {HTMLUListElement} The created and populated nav element
 */
const createNavigation = (range=1) => {
	const nav = document.createElement('nav');
	nav.className = 'Gallery__nav';
	while(nav.children.length < range) {
		const button = createNavButton(nav.children.length + 1);
		nav.appendChild(button);
	}
	return nav;
};
/** 
 * GalleryControll component class
 * @param {Number} count - Count of items loaded in the gallery view
 * @return {HTMLDivElement} The controll wrapper element
 */
export class GalleryControll {
	constructor(count=0) {
		this.controlls = document.createElement('div');
		this.nav = createNavigation(count);
		this.prevButton = createPrevButton();
		this.nextButton = createNextButton(); 
		this.navButtons = [...this.nav.children];
		this.active = this.nav.firstElementChild;
		this.init();
		return this.controlls;
	}
	/**
	 * Getter for the current active:disabled nav button. 
	 * Setter for the selected nav button enables all nav buttons, except for the target element 
	 * @param {HTMLElementButton} target - Current activated item nav button 
	 * @return {HtmlElementButton} 
	*/
	get active() {
		return this.navButtons.find(button => !!button.disabled);
	}	
	set active(target) {
		for(const button of this.navButtons.values()) {
			button.disabled = (button === target);
		}
	}
	/** 
	 * Method used as callback for the prevButton element click event
	 * @return {Void}
	*/
	onPrev() {
		this.active = this.active.previousElementSibling || this.nav.lastElementChild;
		this.controlls.dispatchEvent(new CustomEvent('prev', {
			detail: {current: this.navButtons.indexOf(this.active)},
		}));
	}
	/**
	 * Method used as callback for a nav button element click event
	 * @param {HTMLElementButton} target - Clicked nav button
	 * @return {Void}
	 */
	goTo(target) {
		this.active = target;
		this.controlls.dispatchEvent(new CustomEvent('goTo', {
			detail: {current: this.navButtons.indexOf(target)},
		}));
	}
	/** 
	 * Method used as callback for the nextButton element click event
	 * @return {string}
	*/
	onNext() {
		this.active = this.active.nextElementSibling || this.nav.firstElementChild;
		this.controlls.dispatchEvent(new CustomEvent('next', {
			detail: {current: this.navButtons.indexOf(this.active)},
		}));
	}
	/** 
	 * Initialize the gallery controll component by
	 * 	adding a click event listener to each controll button instance,
	 * 	passing their respective method as the event callback.
	 * @return {Void}
	*/
	init() {		
		this.controlls.className = 'Gallery__controlls';		
		this.prevButton.addEventListener('click', () => this.onPrev());
		this.nextButton.addEventListener('click', () => this.onNext());
		this.navButtons.map(btn => btn.addEventListener('click', e => this.goTo(e.target)));
		this.controlls.appendChild(this.nextButton);
		this.controlls.appendChild(this.nav);
		this.controlls.appendChild(this.prevButton);	
	}
}
