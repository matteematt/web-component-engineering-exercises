import "./ui-page.js";

const template = `
	<div id="container">
		<slot name="contents"></slot>
		<div id="controls">
			<button id="previous">Previous</button>
<!--			<ui-page id="page"></ui-page>-->
			<button id="next">Next</button>
		</div>
	</div>
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

class UiPager extends HTMLElement {
  constructor() {
    super();
		this.attachShadow({mode: "open"})
			.innerHTML = `<style>${styles}</style>${template}`;
  }

	connectedCallback() {
		this.#configureChildren();
	}

	#configureChildren() {
		const pageContainers = this.querySelectorAll("ui-page");
		pageContainers.forEach((uiPage) => {
			uiPage.slot = "contents";
		})
	}
}

customElements.define("ui-pager", UiPager);
