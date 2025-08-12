(function() { 
	let template = document.createElement("template");
	template.innerHTML = `
		<style>
		.box {
			border-radius: 25px;
			border-width: 4px;
			border-color: black;
			border-style: solid;
			display: block;
   			background-color: red; 
			opacity: 1; 
		} 
		</style> 
  		<div class="box"></div>
	`;

	class Box extends HTMLElement {
		constructor() {
			super(); 
			this._shadowRoot = this.attachShadow({ mode: "open" });
			this._shadowRoot.appendChild(template.content.cloneNode(true));
			this.color = "red";
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});
			this._props = {};
		}
		setColor(newColor) {
		this.color = newColor;
		this.style.backgroundColor = newColor;
	}

	getColor() {
		return this.color;
	}

		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			if ("opacity" in changedProperties) {
			this.style.opacity = changedProperties["opacity"];
			}
			
		}
	}

	customElements.define("com-sample-box", Box);
})();






