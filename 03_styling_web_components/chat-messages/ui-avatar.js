const DEFAULT_AVATAR =
  "https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light";

const template = `
	<div id="container"></div>
`;

const styles = `
<style>
	:host {
		display: block;
		contain: content;
		--initials: '?';
	}

	:host([hidden]) {
		display: none;
	}

	div.initials {
    position: relative;
    z-index: 6;
    left: 30px;
	}

	div.initials:before {
    content: '';
    display: inline-block;
    width: 260px;
    height: 270px;
    -moz-border-radius: 7.5px;
    -webkit-border-radius: 7.5px;
    border-radius: 150px;
    background-color: #69b6d5;
    position: relative;
    right: 22px;
    top: 5px;
    z-index: 3;
	}

	div.initials:after {
    content: var(--initials);
    position: relative;
    right: 210px;
    z-index: 3;
    bottom: 103px;
    font-size: 7rem;
	}
</style>
`;

class UiAvatar extends HTMLElement {
  static observedAttributes = ["image", "initials"];
  #container = null;
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = `${styles}${template}`;
  }

  connectedCallback() {
    if (!this.#container) {
      this.#container = this.shadowRoot.querySelector("div#container");
      this.#updateContents();
    }
  }

  attributeChangedCallback(_, oldValue, newValue) {
    if (oldValue === newValue) return;
    this.#updateContents();
  }

  #updateContents() {
    if (!this.#container) {
      console.warn("Container not ready");
      return;
    }
    const sources = [
      this.getAttribute("image")
        ? () => this.#createImage(this.getAttribute("image"))
        : null,
      this.getAttribute("initials")
        ? () => this.#createInitials(this.getAttribute("initials"))
        : null,
      () => this.#createImage(),
    ].filter((source) => source !== null);
    const element = sources[0]();
    this.#container.innerHTML = "";
    this.#container.appendChild(element);
  }

  #createInitials(initials) {
    console.log(initials);
    const initialsContainer = document.createElement("div");
    initialsContainer.classList.add("initials");
    this.style.setProperty("--initials", `'${initials.toUpperCase()}'`);
    return initialsContainer;
  }

  #createImage(src = DEFAULT_AVATAR) {
    console.log(src);
    const image = document.createElement("img");
    image.src = src;
    return image;
  }
}

customElements.define("ui-avatar", UiAvatar);
