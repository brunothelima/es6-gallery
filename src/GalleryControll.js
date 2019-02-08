class GalleryPrevButton {
  constructor() {
    this._el = document.createElement('button');
    this._el.textContent = 'Previews';
    this._el.className = 'Gallery__prev';
    return this._el;
  }
}
class GalleryNextButton {
  constructor() {
    this._el = document.createElement('button');
    this._el.textContent = 'Next';
    this._el.className = 'Gallery__next';
    return this._el;
  }
}
class GalleryNavButton {
  constructor(index=0) {
    this._el = document.createElement('button');
    this._el.textContent = index;
    this._el.className = 'Gallery__index';
    return this._el;
  }
}
class GalleryNavigation {
  constructor(counter=0) {
    this._el = document.createElement('nav');
    this._el.className = 'Gallery__nav';
    for(let i = 1; i <= counter; i++){ 
      const button = new GalleryNavButton(i);
      this._el.appendChild(button);
    }
    return this._el;
  }
}
export class GalleryControll {
  constructor(counter=0) {
    this._el = document.createElement('div');
    this._nav = new GalleryNavigation(counter);
    this._prevButton = new GalleryPrevButton();
    this._nextButton = new GalleryNextButton(); 
    this._navButtons = [...this._nav.children];
    this.init();
    return this._el;
  }
  set _active(target) {
    for(const button of this._navButtons.values()) {
      button.disabled = (button === target);
    }
  }
  get _active() {
    return this._navButtons.find(button => !!button.disabled);
  }
  onPrev() {
    this._active = this._active.previousElementSibling || this._nav.lastElementChild;
    this._el.dispatchEvent(new CustomEvent('prev', {
      detail: {current: this._navButtons.indexOf(this.active)},
    }));
  }
  goTo(target) {
    this._active = target;
    this._el.dispatchEvent(new CustomEvent('goTo', {
      detail: {current: this._navButtons.indexOf(target)},
    }));
  }
  onNext() {
    this._active = this._active.nextElementSibling || this._nav.firstElementChild;
    this._el.dispatchEvent(new CustomEvent('next', {
      detail: {current: this._navButtons.indexOf(this.active)},
    }));
  }
  init() {
    this._prevButton.addEventListener('click', _ => this.onPrev());
    this._nextButton.addEventListener('click', _ => this.onNext());
    this._navButtons.map(btn => btn.addEventListener('click', e => this.goTo(e.target)));
    this._el.appendChild(this._nextButton);
    this._el.appendChild(this._nav);
    this._el.appendChild(this._prevButton);
    this._el.className = 'Gallery__controlls';
    this._active = this._nav.firstElementChild;
  }
}
