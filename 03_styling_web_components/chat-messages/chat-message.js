const USER_IMAGE =
	"https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads02&accessoriesType=Kurt&hairColor=Brown&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=Gray02&eyeType=Hearts&eyebrowType=DefaultNatural&mouthType=Smile&skinColor=Pale";
const USER_NAME = "Johnny Smith";

const template = `
<div class="container">
	<ui-avatar></ui-avatar>
	<p class="title"></p>
	<slot></slot>
</div>
`;

const styles = `
<style>
	:host {
		border-radius: 2px;
		border: 1px solid #000;
		contain: content;
		display: block;
		margin: 5px;
	}

	div {
		display: flex;
		align-items: center;
	}

	div.user {
		flex-direction: row-reverse;
	}
</style>
`;

class ChatMessage extends HTMLElement {
	static observedAttributes = ["image", "name", "is-user"];
	constructor() {
		super();
		this.attachShadow({ mode: "open" }).innerHTML = `${styles}${template}`;
	}

	connectedCallback() {
		this.#processAttributes();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue === newValue) return;
		this.#processAttributes();
	}

	#processAttributes() {
		// throw error if name and is-user are both not set
		if (!this.getAttribute("name") && !this.hasAttribute("is-user")) {
			throw new Error("name or is-user attributes are required");
		}
		if (this.hasAttribute("is-user")) {
			this.setAttribute("image", USER_IMAGE);
			this.setAttribute("name", USER_NAME);
			this.shadowRoot.querySelector("div.container").classList.add("user");
		} else {
			this.shadowRoot.querySelector("div.container").classList.remove("user");
		}
		this.#setAvatarAttributes();
	}

	#setAvatarAttributes() {
		const avatar = this.shadowRoot.querySelector("ui-avatar");
		this.getAttribute("image")
			? avatar.setAttribute("image", this.getAttribute("image"))
			: avatar.removeAttribute("image");
		avatar.setAttribute(
			"initials",
			this.getAttribute("name")
				.split(" ")
				.map((s) => s[0])
				.join(""),
		);
	}
}

customElements.define("chat-message", ChatMessage);
