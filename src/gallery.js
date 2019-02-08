import GalleryView from './GalleryView.js';
import {GalleryControll} from './GalleryControll.js';

export default class {
  constructor(el) {
    this.el = el;    
    this.items = [...this.el.children].map(child => this.el.removeChild(child));;
  	this.view = new GalleryView(this.el, this.items);
    this.controlls = new GalleryControll(this.items.length);
    this.el.appendChild(this.controlls);
    this.current = 0;
    this.init();
  }
  set current(index) {
    this.index = index;
  }
  get current() {
  	return this.index || 0;
  }
  get total() {
  	return this.items.length;
  }
  init() {
  	this.controlls.addEventListener('prev', _ => {
  		this.current = this.index <= 0 ? this.total - 1 : this.index - 1;
  	});
  	this.controlls.addEventListener('goTo', e => {
  		this.current = e.detail.current;
  	});
  	this.controlls.addEventListener('next', _ => {
  		this.current = this.index >= (this.total - 1) ? 0 : this.index + 1;
  	});
  }
}