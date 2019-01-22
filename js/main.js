import {Gallery} from './Gallery.js';

const gallery = new Gallery('#gallery');
setTimeout(function() {
	gallery.insert(document.createElement('img'));
}, 3000);