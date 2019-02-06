function GalleryViewItem(item, selected=false) {
  const li = document.createElement('li');
  li.style.display = (selected) ? 'none' : 'block';
	li.appendChild(item);
	return li;	
}
export default class {
  constructor(parent, items) {
    this.parent = parent;
    this.items = items;
    this.el = document.createElement('ul');
    this.init();
  }
  update(selected) {
  	for(const index of this.items.keys()) {
			const display = (index !== selected) ? 'none' : 'block';
			this.el.children[index].style.display = display;
		}
  }
  init() {
  	for(let [index, item] of this.items.entries()) {
  		const selected = (index > 0) ? true : false;
  		this.el.appendChild(GalleryViewItem(item, selected));
  	}
  	this.parent.appendChild(this.el);
  }
}
