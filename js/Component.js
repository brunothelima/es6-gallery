export class Component {
	// Component class constructor
	constructor(element) {
		this._element = this.extractElement(element);
	}
	extractElement(element) {
		let reference;
		// Try to get a DOM reference of the el argument if it is a String
		try {
			if (element instanceof HTMLElement) {
				reference = element;
			} else if ((typeof element === 'string' || element instanceof String) && element.match('(#|.).*')) {
				// Checks if the element reference exists
				if (document.querySelector(element)) {
					reference = document.querySelector(element);
				} else {
					// Throw error if the selector match is undefined
					throw new Error(`The selector '${element}' has no element match.`);
				}
			} else {
				throw new Error('Invalid initialization selector/element')
			}
		} catch(error) {
			alert(error);
		}
		return reference;
	}
}