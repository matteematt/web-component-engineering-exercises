class UiBadge extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = "Hello World!";
  }
}

customElements.define("ui-badge", UiBadge);
