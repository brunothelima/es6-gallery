export class GalleryFactory {
	static createPrevButton() {
		const button = document.createElement('button');
		button.textContent = 'Previews';
		button.className = 'Gallery__prev'; 
		return button;
	};
	static createNextButton() {
		const button = document.createElement('button');
		button.textContent = 'Next';
		button.className = 'Gallery__next';
		return button;
	};
	static createNavButton(index=1) {
		const button = document.createElement('button');
		button.textContent = index;
		button.className = 'Gallery__index';
		return button;
	}
	static createNavigation(range=1) {
		const nav = document.createElement('nav');
		nav.className = 'Gallery__nav';
		while(nav.children.length < range) {
			const index = nav.children.length + 1;
			const button = this.createNavButton(index);
			nav.appendChild(button);
		}
		return nav;
	};
	static createControlls() {
		const controlls = document.createElement('div');
		controlls.className = 'Gallery__controlls';
		return controlls;
	}
	static createViewItem(context=HTMLElement) {
		const item = document.createElement('li');
		item.className = 'Gallery__item';
		item.appendChild(context);
		return item;	
	};
	static createView(items=[]) {
		const view = document.createElement('ul');
		view.className = 'Gallery__view';		
		for(let item of items.values()) {
			const li = this.createViewItem(item);
			view.appendChild(li);
		}
		return view;
	}
}