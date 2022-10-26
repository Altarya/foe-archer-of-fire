import {onManageActiveEffect, prepareActiveEffectCategories} from "../helpers/effects.mjs";
import { calculateMFD, setSkillRank, setSPECIAL } from "../helpers/utils.mjs";

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class foeActorSheet extends ActorSheet {

	/** @override */
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			classes: ["foe", "sheet", "actor"],
			template: "systems/foe-archer-of-fire/templates/actor/actor-sheet.hbs",
			width: 600,
			height: 600,
			tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "features" }]
		});
	}

	/** @override */
	get template() {
		return `systems/foe-archer-of-fire/templates/actor/actor-${this.actor.type}-sheet.hbs`;
	}

	/* -------------------------------------------- */

	/** @override */
	getData() {
		// Retrieve the data structure from the base sheet. You can inspect or log
		// the context variable to see the structure, but some key properties for
		// sheets are the actor object, the data object, whether or not it's
		// editable, the items array, and the effects array.
		const context = super.getData();

		// Use a safe clone of the actor data for further operations.
		const actorData = this.actor.toObject(true);

		// Add the actor's data to context.data for easier access, as well as flags.
		context.system = actorData.data;
		context.flags = actorData.flags;

		// Prepare character data and items.
		if (actorData.type == 'character') {
			this._prepareItems(context);
			this._prepareCharacterData(context);
		}

		// Prepare NPC data and items.
		if (actorData.type == 'npc') {
			this._prepareItems(context);
		}

		// Add roll data for TinyMCE editors.
		context.rollData = context.actor.getRollData();

		// Prepare active effects
		context.effects = prepareActiveEffectCategories(this.actor.effects);

		return context;
	}

	/**
	 * Organize and classify Items for Character sheets.
	 *
	 * @param {Object} actorData The actor to prepare.
	 *
	 * @return {undefined}
	 */
	_prepareCharacterData(context) {
		// Handle ability scores.
		let total = 0;
		for (let [k, v] of Object.entries(context.system.special)) {
			//v.label = game.i18n.localize(CONFIG.SPECIAL[k]) ?? k;

			calculateMFD(this.actor, v, k);
			total -= v.val;
		}

		let check = parseInt(this.actor.data.data.creation_points.max);
		total += check;

		this.actor.update({'data.creation_points.val': total});
	}

	/**
	 * Organize and classify Items for Character sheets.
	 *
	 * @param {Object} actorData The actor to prepare.
	 *
	 * @return {undefined}
	 */
	_prepareItems(context) {
		// Initialize containers.
		const gear = [];
		const features = [];
		const spells = {
			0: [],
			1: [],
			2: [],
			3: [],
			4: [],
			5: [],
			6: [],
			7: [],
			8: [],
			9: []
		};

		// Iterate through items, allocating to containers
		for (let i of context.items) {
			i.img = i.img || DEFAULT_TOKEN;
			// Append to gear.
			if (i.type === 'item') {
				gear.push(i);
			}
			// Append to features.
			else if (i.type === 'feature') {
				features.push(i);
			}
			// Append to spells.
			else if (i.type === 'spell') {
				if (i.system.spellLevel != undefined) {
					spells[i.system.spellLevel].push(i);
				}
			}
		}

		// Assign and return
		context.gear = gear;
		context.features = features;
		context.spells = spells;
	}

	/* -------------------------------------------- */

	/** @override */
	activateListeners(html) {
		super.activateListeners(html);

		// Render the item sheet for viewing/editing prior to the editable check.
		html.find('.item-edit').click(ev => {
			const li = $(ev.currentTarget).parents(".item");
			const item = this.actor.items.get(li.data("itemId"));
			item.sheet.render(true);
		});

		// -------------------------------------------------------------
		// Everything below here is only needed if the sheet is editable
		if (!this.isEditable) return;

		html.find('.special_mod').change(this._onSpecialModChange.bind(this));

		html.find('.cp_input').change(this._onCPChange.bind(this));

		html.find('.special_input').change(this._onEdit.bind(this));

		html.find('.skill_input').change(this._onEditSkill.bind(this));

		html.find('.special_button').click(this._onSpecialClick.bind(this));

		// Add Inventory Item
		html.find('.item-create').click(this._onItemCreate.bind(this));

		// Delete Inventory Item
		html.find('.item-delete').click(ev => {
			const li = $(ev.currentTarget).parents(".item");
			const item = this.actor.items.get(li.data("itemId"));
			item.delete();
			li.slideUp(200, () => this.render(false));
		});

		// Active Effect management
		html.find(".effect-control").click(ev => onManageActiveEffect(ev, this.actor));

		// Rollable special.
		html.find('.rollable').click(this._onRoll.bind(this));

		// Drag events for macros.
		if (this.actor.isOwner) {
			let handler = ev => this._onDragStart(ev);
			html.find('li.item').each((i, li) => {
				if (li.classList.contains("inventory-header")) return;
				li.setAttribute("draggable", true);
				li.addEventListener("dragstart", handler, false);
			});
		}
	}

	_onSpecialModChange(event) {
		event.preventDefault();
		const header = event.currentTarget;
		// Get the type of item to create.
		const type = header.dataset.type;
		// Grab any data associated with this control.
		const data = duplicate(header.value);

		let num = parseInt(data);
		let specials = this.actor.data.data.special;
		let statName = header.name.match("^system.special.(.*).label$")[1];

		switch (statName) {
			case "strength":
				this.actor.update({'data.special.strength.mod': num});
				specials.strength.mod = num;
				break;
			case "perception":
				this.actor.update({'data.special.perception.mod': num});
				specials.perception.mod = num;
				break;
			case "endurance":
				this.actor.update({'data.special.endurance.mod': num});
				specials.endurance.mod = num;
				break;
			case "charisma":
				this.actor.update({'data.special.charisma.mod': num});
				specials.charisma.mod = num;
				break;
			case "intelligence":
				this.actor.update({'data.special.intelligence.mod': num});
				specials.intelligence.mod = num;
				break;
			case "agility":
				this.actor.update({'data.special.agility.mod': num});
				specials.agility.mod = num;
				break;
			case "luck":
				this.actor.update({'data.special.luck.mod': num});
				specials.luck.mod = num;
				break;
			default:
				break;
		}
	}

	_onCPChange(event) {
		event.preventDefault();
		const header = event.currentTarget;
		// Get the type of item to create.
		const type = header.dataset.type;
		// Grab any data associated with this control.
		const data = duplicate(header.value);

		let total = 0;

		let specials = this.actor.data.data.special;

		for (let [key, ability] of Object.entries(specials)) {
			total -= ability.val;
		}

		let check = parseInt(data);
		total += check;

		this.actor.update({'data.creation_points.val': total});
		this.actor.update({'data.creation_points.max': check});
	}

	_onSpecialClick(event) {
		event.preventDefault();
		const header = event.currentTarget;
		// Get the type of item to create.
		const type = header.dataset.type;
		// Grab any data associated with this control.
		const data = duplicate(header.value);

		let specials = this.actor.data.data.special;
		let statName = header.name.match("^system.special.(.*).label$")[1];

		let change = -1;
		if (data == "+") {
			change = 1;
			let check = parseInt(this.actor.data.data.creation_points.val);
			if ((check-1) < 0) {
				//return;
				//Disabled until trait/hindrance support is added
			}
		}
		let val = 0;
		switch (statName) {
			case "strength":
				val = specials.strength.val;
				break;
			case "perception":
				val = specials.perception.val;
				break;
			case "endurance":
				val = specials.endurance.val;
				break;
			case "charisma":
				val = specials.charisma.val;
				break;
			case "intelligence":
				val = specials.intelligence.val;
				break;
			case "agility":
				val = specials.agility.val;
				break;
			case "luck":
				val = specials.luck.val;
				break;
			default:
				break;
		}

		setSPECIAL(statName, specials, val+change, this.actor);
	}

	_onEdit(event) {
		event.preventDefault();
		const header = event.currentTarget;
		// Get the type of item to create.
		const type = header.dataset.type;
		// Grab any data associated with this control.
		const data = duplicate(header.value);
		const statChange = parseInt(data);
		let specials = this.actor.data.data.special;
		let check = parseInt(this.actor.data.data.creation_points.val);
		if ((check-parseInt(data)) < 0) {
			//return;
		}

		let statName = header.name.match("^system.special.(.*).label$")[1];

		setSPECIAL(statName, specials, statChange, this.actor);
	}

	_onEditSkill(event) {
		event.preventDefault();
		const header = event.currentTarget;
		// Get the type of item to create.
		const type = header.dataset.type;
		// Grab any data associated with this control.
		const data = duplicate(header.value);
		const statChange = parseInt(data);
		let skills = this.actor.data.data.skills;

		let statName = header.name.match("^system.skill.(.*)$")[1];

		setSkillRank(statName, skills, this.actor, statChange);
	}

	/**
	 * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
	 * @param {Event} event   The originating click event
	 * @private
	 */
	async _onItemCreate(event) {
		event.preventDefault();
		const header = event.currentTarget;
		// Get the type of item to create.
		const type = header.dataset.type;
		// Grab any data associated with this control.
		const data = duplicate(header.dataset);
		// Initialize a default name.
		const name = `New ${type.capitalize()}`;
		// Prepare the item object.
		const itemData = {
			name: name,
			type: type,
			system: data
		};
		// Remove the type from the dataset since it's in the itemData.type prop.
		delete itemData.system["type"];

		// Finally, create the item!
		return await Item.create(itemData, {parent: this.actor});
	}

	/**
	 * Handle clickable rolls.
	 * @param {Event} event   The originating click event
	 * @private
	 */
	_onRoll(event) {
		event.preventDefault();
		const element = event.currentTarget;
		const dataset = element.dataset;

		// Handle item rolls.
		if (dataset.rollType) {
			if (dataset.rollType == 'item') {
				const itemId = element.closest('.item').dataset.itemId;
				const item = this.actor.items.get(itemId);
				if (item) return item.roll();
			}
		}

		// Handle rolls that supply the formula directly.
		if (dataset.roll) {
			let label = dataset.label ? `${dataset.label}` : '';
			let roll = new Roll(dataset.roll, this.actor.getRollData());
			roll.toMessage({
				speaker: ChatMessage.getSpeaker({ actor: this.actor }),
				flavor: label,
				rollMode: game.settings.get('core', 'rollMode'),
			});
			return roll;
		}
	}

}
