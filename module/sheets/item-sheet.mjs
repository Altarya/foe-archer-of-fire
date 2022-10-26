/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class foeItemSheet extends ItemSheet {

	/** @override */
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			classes: ["foe", "sheet", "item"],
			width: 520,
			height: 480,
			tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
		});
	}

	/** @override */
	get template() {
		const path = "systems/foe-archer-of-fire/templates/item";
		// Return a single sheet for all item types.
		// return `${path}/item-sheet.hbs`;

		// Alternatively, you could use the following return statement to do a
		// unique item sheet by type, like `weapon-sheet.hbs`.
		return `${path}/item-${this.item.type}-sheet.hbs`;
	}

	/* -------------------------------------------- */

	/** @override */
	getData() {
		// Retrieve base data structure.
		const context = super.getData();

		// Use a safe clone of the item data for further operations.
		const itemData = context.item;

		// Retrieve the roll data for TinyMCE editors.
		context.rollData = {};
		let actor = this.object?.parent ?? null;
		if (actor) {
			context.rollData = actor.getRollData();
		}

		// Add the actor's data to context.data for easier access, as well as flags.
		context.system = itemData.data.data;
		context.flags = itemData.flags;

		return context;
	}

	/* -------------------------------------------- */

	/** @override */
	activateListeners(html) {
		super.activateListeners(html);

		// Everything below here is only needed if the sheet is editable
		if (!this.isEditable) return;

		html.find('.item_property').change(this._onEditField.bind(this));

		// Roll handlers, click handlers, etc. would go here.
	}

	_onEditField(event) {
		event.preventDefault();
		const header = event.currentTarget;
		// Get the type of item to create.
		const type = header.dataset.type;
		// Grab any data associated with this control.
		const data = duplicate(header.value);
		const dataNum = parseInt(duplicate(header.value));

		let fieldName = header.name;

		switch (fieldName) {
			case "description":
				this.object.update({'data.description': data});
				this.object.data.data.description = data;
				break;
			case "quantity":
				this.object.update({'data.quantity': dataNum});
				this.object.data.data.quantity = dataNum;
				break;
			case "value":
				this.object.update({'data.value': dataNum});
				this.object.data.data.value = dataNum;
				break;
			case "weight":
				this.object.update({'data.weight': dataNum});
				this.object.data.data.weight = dataNum;
				break;
			default:
				break;
		}
	}
}
