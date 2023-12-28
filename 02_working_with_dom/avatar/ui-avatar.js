class UiAvatar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = "Hello World!";
  }
}

customElements.define("ui-avatar", UiAvatar);
