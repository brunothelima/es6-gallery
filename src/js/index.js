import {Gallery} from './ui/Gallery.js';

const gallery = new Gallery('#gallery');

const img = new Image();
img.src = 'https://picsum.photos/200/400?image=14';
setTimeout(function() {
	document.querySelector('.gallery__lens').appendChild(img);
}, 5000);