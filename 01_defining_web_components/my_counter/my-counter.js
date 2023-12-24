class MyCounter extends HTMLElement {
	static #fragment = null;
	#view = null;

	static observedAttributes = ["count"];
	#countDisplay = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

	connectedCallback() {
		if (this.#view === null) {
			this.#view = this.#createView();
			this.shadowRoot.appendChild(this.#view);
		}
		this.#countChanged();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "count") {
			this.#countChanged();
		}
	}

	#countChanged() {
		if (this.#countDisplay == null) {
			this.#countDisplay = this.shadowRoot.getElementById("count");
		}
		this.#countDisplay.textContent = this.getAttribute("count");
	}

	#createView() {
		if (MyCounter.#fragment === null) {
			const template = document.getElementById("my-counter");
			MyCounter.#fragment = document.adoptNode(template.content);
		}
		return MyCounter.#fragment.cloneNode(true);
	}
}

customElements.define("my-counter", MyCounter);
