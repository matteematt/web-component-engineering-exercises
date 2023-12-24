class MyComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = "Hello World!";
  }
}

customElements.define("my-component", MyComponent);