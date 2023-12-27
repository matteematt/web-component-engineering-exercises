import "./ui-page.js";

const template = `
	<div id="container">
		<slot name="contents"></slot>
		<span id="controls">
			<button id="previous">Previous</button>
			<span id="jump-control"></span>
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

const eventOptions = {
  bubbles: true,
  composed: true,
  cancelable: true,
};

class UiPager extends HTMLElement {
  static observedAttributes = ["page-count", "current-page", "button-count"];

  // should have made the IDL attributes integers in javascript
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
    return this.getAttribute("button-count");
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
    const pageBeforeEvent = this.currentPage;
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
      default:
        this.currentPage =
          event.target.getAttribute("data-page") ||
          (console.warn("Invalid page"), "0");
        this.#processPages();
    }

    if (pageBeforeEvent !== this.currentPage) {
      this.dispatchEvent(new CustomEvent("page-change", eventOptions));
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.#processPages();
  }

  #processPages() {
    const lowerBound = parseInt(this.currentPage || "0");
    const upperBound = lowerBound + parseInt(this.pageCount || "2");
    const predicateShow = (index) => index >= lowerBound && index < upperBound;
    const innerPages = Array.from(this.children);

    innerPages.forEach((page, index) => {
      page.hidden = !predicateShow(index);
    });

    this.#processButtons();
  }

  #processButtons() {
    const innerPages = Array.from(this.children);
    const buttonCount = parseInt(this.buttonCount || "5");
    const lowerBound = Math.max(
      0,
      parseInt(this.currentPage || "0") - Math.floor(buttonCount / 2),
    );
    const upperBound = Math.min(innerPages.length, lowerBound + buttonCount);
    const movedLowerBound = Math.max(0, upperBound - buttonCount);
    const controlDiv = this.shadowRoot.getElementById("jump-control");
    controlDiv.innerHTML = "";
    for (let index = movedLowerBound; index < upperBound; index++) {
      const button = document.createElement("button");
      button.innerText = index + 1;
      button.addEventListener("click", this);
      button.setAttribute("data-page", index);
      controlDiv.appendChild(button);
    }
  }

  #configureChildren() {
    const pageContainers = this.querySelectorAll("ui-page");
    pageContainers.forEach((uiPage) => {
      uiPage.slot = "contents";
    });
  }
}

customElements.define("ui-pager", UiPager);
