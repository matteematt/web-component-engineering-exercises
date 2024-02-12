const template = `
<div>
	<ui-avatar></ui-avatar>
</div>
`;

const styles = ``;

class ChatMessage extends HTMLElement {
	static observedAttributes = ["image", "initials"];
	constructor() {
		super();
		this.attachShadow({ mode: "open" }).innerHTML = `${styles}${template}`;
	}

	connectedCallback() {
		this.#setAvatarAttributes();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue === newValue) return;
		if (name === "image" || name === "initials") {
			this.#setAvatarAttributes();
		}
	}

	#setAvatarAttributes() {
		const avatar = this.shadowRoot.querySelector("ui-avatar");
		this.getAttribute("image")
			? avatar.setAttribute("image", this.getAttribute("image"))
			: avatar.removeAttribute("image");
		this.getAttribute("initials")
			? avatar.setAttribute("initials", this.getAttribute("initials"))
			: avatar.removeAttribute("initials");
	}
}

customElements.define("chat-message", ChatMessage);
