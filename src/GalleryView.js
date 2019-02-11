/** 
 * Factory for GalleryPrevButton elements
 * @private
 * @param {HTMLElement} item - element to be wrapped
 * @return {HTMLLiElement} The created wrapper li element
 */
const createViewItem = item => {
	const li = document.createElement('li');
	li.className = 'Gallery__item';
	li.appendChild(item);
	return li;	
};
/** 
 * GalleryView component class
 * @return {HTMLUListElement}
*/
export class GalleryView {
	/** 
	 * @param {Array} items - List of items to be displayed in the gallery view
	*/
	constructor(items=[]) {
		this.view = document.createElement('ul');
		this.items = items;
		this.init();
		return this.view;
	}
	init() {
		this.view.className = 'Gallery__view';
		for(let [index, item] of this.items.entries()) {
			const li = createViewItem(item);
			li.style.display = (index === 0) ? 'block' : 'none';
			this.view.appendChild(li);
		}
	}
}
	