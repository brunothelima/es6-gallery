/**
 * This is a event dispatcher class. Used by the `Gallery` component 
 * to emmit custom events on user interactions with the gallery
 */
export class GalleryEvents {
	static dispatch(target = HTMLElement, event, detail = {}) {
		target.dispatchEvent(new CustomEvent(event, { detail: detail }));
	}
}