export class GalleryEvents {
	static dispatch(target = HTMLElement, event, detail = {}) {
		target.dispatchEvent(new CustomEvent(event, { detail: detail }));
	}
}