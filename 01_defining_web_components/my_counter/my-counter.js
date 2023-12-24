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
			this.#countDisplay = this.shadowRoot.getElementById("count");
		}
		this.#countChanged();
		this.shadowRoot.getElementById('dec').addEventListener('click', this.#countDownHandler.bind(this));
		this.shadowRoot.getElementById('inc').addEventListener('click', this.#countUpHandler.bind(this));
	}

	disconnectedCallback() {
		this.shadowRoot.getElementById('dec').removeEventListener('click', this.#countDownHandler.bind(this));
		this.shadowRoot.getElementById('inc').removeEventListener('click', this.#countDownHandler.bind(this));
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "count") {
			this.#countChanged();
		}
	}

	#countChanged() {
		if (this.#countDisplay) {
			this.#countDisplay.textContent = this.getAttribute("count") ?? "0";
		}
	}

	#countUpHandler() {
		this.#countHandler((count) => parseInt(count, 10) + 1);
	}

	#countDownHandler() {
		this.#countHandler((count) => parseInt(count, 10) - 1);
	}

	#countHandler(fn) {
		this.setAttribute("count", fn(this.getAttribute("count") ?? "0"));
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
