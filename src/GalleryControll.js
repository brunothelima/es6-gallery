/**
 * Gallery prev button factory
 * @return {HTMLButtonElement} button
**/
function GalleryPrevButton() {
  const button = document.createElement('button');
  button.textContent = 'Previews';
  return button;
}
function GalleryNavigation(range=0) {
  const nav = document.createElement('nav');
  for(let i = 1; i <= range; i++){
    const button = document.createElement('button');
    button.textContent = i;
    nav.appendChild(button);
  }
  return nav;
}
function GalleryNextButton() {
  const button = document.createElement('button');
  button.textContent = 'Next';
  return button;
}
export default class {
  constructor(parent, range) {
    this.parent = parent;
    this.el = document.createElement('div');
    this.prevButton = GalleryPrevButton();
    this.navigation = GalleryNavigation(range);
    this.nextButton = GalleryNextButton();
    this.init();
  }
  onPrev(event) {
    this.el.dispatchEvent(new CustomEvent('next'));
  }
  goTo(event) {
    this.el.dispatchEvent(new CustomEvent('goTo', {
      detail: { current: index },
    }));
  }
  onNext(event) {
    this.el.dispatchEvent(new CustomEvent('next'));
  }
  init() {
    this.prevButton.addEventListener('click', e => this.onPrev(e));
    this.nextButton.addEventListener('click', e => this.onNext(e));
    [...this.navigation.children].map((bullet, index) => {
      bullet.addEventListener('click', e => this.goTo(e));
    });
  	this.el.appendChild(this.prevButton);
    this.el.appendChild(this.navigation);
    this.el.appendChild(this.nextButton);
    this.parent.appendChild(this.el);
    this.update();
  }
}
