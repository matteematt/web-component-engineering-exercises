class UiBadge extends HTMLElement {
	static #fragment = null;
	#view = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

	connectedCallback() {
		if (this.#view == null) {
			this.#view = this.#createView();
			this.shadowRoot.appendChild(this.#view);
		}
	}

	#createView() {
		if (UiBadge.#fragment == null) {
			const template = document.getElementById("ui-badge");
			UiBadge.#fragment = document.adoptNode(template.content);
		}
		return UiBadge.#fragment.cloneNode(true);
	}
}

customElements.define("ui-badge", UiBadge);
