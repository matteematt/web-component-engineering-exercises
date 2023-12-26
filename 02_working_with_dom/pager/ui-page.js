const template = `
	<slot></slot>
`;

const styles = `
	:host {
		display: block;
		contain: content;
	}

	:host([hidden]) {
		display: none;
	}
`;

export class UiPage extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({mode: "open"})
			.innerHTML = `<style>${styles}</style>${template}`;
	}
}

customElements.define('ui-page', UiPage);
