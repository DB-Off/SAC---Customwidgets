(function()  {
	let template = document.createElement("template");
	template.innerHTML = `
		<form id="form">
			<fieldset>
				<legend>Box Properties</legend>
				<table>
					<tr>
						<td>Colour</td>
						<td><input id="builder_color" type="text" size="40" maxlength="40"></td>
					</tr>
				</table>
				<input type="submit" style="display:none;">
			</fieldset>
		</form>
		<style>
		:host {
			display: block;
			padding: 1em 1em 1em 1em;
		}
		</style>
	`;

	class BoxBuilderPanel extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
			this._shadowRoot.appendChild(template.content.cloneNode(true));
			this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
		}

		_submit(e) {
			e.preventDefault();
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
					detail: {
						properties: {
							color: this.color
						}
					}
			}));
		}

		set color(val) {
			this._shadowRoot.getElementById("builder_color").value = val;
		}

		get color() {
			return this._shadowRoot.getElementById("builder_color").value;
		}
	}

	  if (!customElements.get("com-sample-box-builder")) {
    customElements.define("com-sample-box-builder", BoxBuilderPanel);
})();





