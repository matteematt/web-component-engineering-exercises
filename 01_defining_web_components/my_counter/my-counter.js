class MyCounter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = "Hello World!";
  }
}

customElements.define("my-counter", MyCounter);
