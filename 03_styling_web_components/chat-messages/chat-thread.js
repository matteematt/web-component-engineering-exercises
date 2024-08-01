const template = `
	<div class="container">
		<h1></h1>
		<div>
			<input type="checkbox" id="compactMode" name="compactMode">
			<label for="compactMode">Compact Mode</label>
		</div>
		<slot></slot>
	</div>
`;

const styles = `
<style>
  :host {
    display: block;
    contain: content;
  }

	:host([compact]) h1 {
		display: none;
	}
</style>
`;

class ChatThread extends HTMLElement {
  static observedAttributes = ["name"];

  #slot = null;
  #title = null;
  #compactCheckbox = null;

  #isConnected = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = `${styles}${template}`;
  }

  connectedCallback() {
    this.#slot = this.shadowRoot.querySelector("slot");
    this.#title = this.shadowRoot.querySelector("h1");
    this.#compactCheckbox = this.shadowRoot.querySelector("input#compactMode");

    this.#isConnected = true;
    this.#processAttributes();
    this.#compactCheckbox.addEventListener(
      "change",
      this.checkboxHandler.bind(this),
    );
  }

  checkboxHandler() {
    if (this.#compactCheckbox.checked) {
      this.setAttribute("compact", this.#compactCheckbox.checked);
    } else {
      this.removeAttribute("compact");
    }
  }

  disconnectedCallback() {
    this.#isConnected = false;
    this.#slot = null;
    this.#title = null;
    this.#compactCheckbox = null;
  }

  attributeChangedCallback(_, oldValue, newValue) {
    if (oldValue === newValue) return;
    this.#processAttributes();
  }

  #processAttributes() {
    if (!this.#isConnected) return;
    if (!this.getAttribute("name")) {
      throw new Error("name attribute is required");
    }
    this.#title.innerText = this.getAttribute("name");
    this.#slot
      .assignedElements()
      .forEach(
        (s) =>
          !s.getAttribute("is-user") &&
          s.setAttribute("name", this.getAttribute("name")),
      );
  }
}

customElements.define("chat-thread", ChatThread);
