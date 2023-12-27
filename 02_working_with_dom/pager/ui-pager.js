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
  static observedAttributes = ["page-count", "current-page", "button-count"];

  set pageCount(value) {
    this.setAttribute("page-count", value);
  }
  get pageCount() {
    return this.getAttribute("page-count");
  }

  set currentPage(value) {
    this.setAttribute("current-page", value);
  }
  get currentPage() {
    return this.getAttribute("current-page");
  }

  set buttonCount(value) {
    this.setAttribute("button-count", value);
  }
  get buttonCount() {
    this.getAttribute("button-count");
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML =
      `<style>${styles}</style>${template}`;
    this.shadowRoot.getElementById("previous").addEventListener("click", this);
    this.shadowRoot.getElementById("next").addEventListener("click", this);
  }

  connectedCallback() {
    this.#configureChildren();
    this.#processPages();
  }

  handleEvent(event) {
    switch (event.target.id) {
      case "previous":
        this.currentPage = Math.max(0, parseInt(this.currentPage || "0") - 1);
        this.#processPages();
        break;
      case "next":
        const pageCount = Array.from(this.children).length;
        this.currentPage = Math.min(
          Math.max(0, pageCount - 1),
          parseInt(this.currentPage || "0") + 1,
        );
        this.#processPages();
        break;
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.#processPages();
  }

  #processPages() {
    const lowerBound = parseInt(this.currentPage || "0");
    const upperBound = lowerBound + parseInt(this.pageCount || "2");
    const predicateShow = (index) => index >= lowerBound && index < upperBound;
    const innerPages = this.children;

    Array.from(innerPages).forEach((page, index) => {
      page.hidden = !predicateShow(index);
    });
  }

  #configureChildren() {
    const pageContainers = this.querySelectorAll("ui-page");
    pageContainers.forEach((uiPage) => {
      uiPage.slot = "contents";
    });
  }
}

customElements.define("ui-pager", UiPager);
