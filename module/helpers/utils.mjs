export function calculateMFD(special, stat, name) {
    stat.mfd.full = ((stat.val*10)+stat.mod)+0.0;
    stat.mfd.two = stat.mfd.full*2;
    stat.mfd.one_and_half = Math.floor(stat.mfd.full*1.5);
    stat.mfd.three_quarter = Math.floor(stat.mfd.full*0.75);
    stat.mfd.half = Math.floor(stat.mfd.full*0.5);
    stat.mfd.quarter = Math.floor(stat.mfd.full*0.25);
    stat.mfd.tenth = Math.floor(stat.mfd.full*0.1);
    switch (name) {
        case "strength":
            special.update({'data.special.strength.mfd.full': stat.mfd.full});
            special.update({'data.special.strength.mfd.two': stat.mfd.two});
            special.update({'data.special.strength.mfd.one_and_half': stat.mfd.one_and_half});
            special.update({'data.special.strength.mfd.three_quarter': stat.mfd.three_quarter});
            special.update({'data.special.strength.mfd.half': stat.mfd.half});
            special.update({'data.special.strength.mfd.quarter': stat.mfd.quarter});
            special.update({'data.special.strength.mfd.tenth': stat.mfd.tenth});
            break;
        case "perception":
            special.update({'data.special.perception.mfd.full': stat.mfd.full});
            special.update({'data.special.perception.mfd.two': stat.mfd.two});
            special.update({'data.special.perception.mfd.one_and_half': stat.mfd.one_and_half});
            special.update({'data.special.perception.mfd.three_quarter': stat.mfd.three_quarter});
            special.update({'data.special.perception.mfd.half': stat.mfd.half});
            special.update({'data.special.perception.mfd.quarter': stat.mfd.quarter});
            special.update({'data.special.perception.mfd.tenth': stat.mfd.tenth});
            break;
        case "endurance":
            special.update({'data.special.endurance.mfd.full': stat.mfd.full});
            special.update({'data.special.endurance.mfd.two': stat.mfd.two});
            special.update({'data.special.endurance.mfd.one_and_half': stat.mfd.one_and_half});
            special.update({'data.special.endurance.mfd.three_quarter': stat.mfd.three_quarter});
            special.update({'data.special.endurance.mfd.half': stat.mfd.half});
            special.update({'data.special.endurance.mfd.quarter': stat.mfd.quarter});
            special.update({'data.special.endurance.mfd.tenth': stat.mfd.tenth});
            break;
        case "charisma":
            special.update({'data.special.charisma.mfd.full': stat.mfd.full});
            special.update({'data.special.charisma.mfd.two': stat.mfd.two});
            special.update({'data.special.charisma.mfd.one_and_half': stat.mfd.one_and_half});
            special.update({'data.special.charisma.mfd.three_quarter': stat.mfd.three_quarter});
            special.update({'data.special.charisma.mfd.half': stat.mfd.half});
            special.update({'data.special.charisma.mfd.quarter': stat.mfd.quarter});
            special.update({'data.special.charisma.mfd.tenth': stat.mfd.tenth});
            break;
        case "intelligence":
            special.update({'data.special.intelligence.mfd.full': stat.mfd.full});
            special.update({'data.special.intelligence.mfd.two': stat.mfd.two});
            special.update({'data.special.intelligence.mfd.one_and_half': stat.mfd.one_and_half});
            special.update({'data.special.intelligence.mfd.three_quarter': stat.mfd.three_quarter});
            special.update({'data.special.intelligence.mfd.half': stat.mfd.half});
            special.update({'data.special.intelligence.mfd.quarter': stat.mfd.quarter});
            special.update({'data.special.intelligence.mfd.tenth': stat.mfd.tenth});
            break;
        case "agility":
            special.update({'data.special.agility.mfd.full': stat.mfd.full});
            special.update({'data.special.agility.mfd.two': stat.mfd.two});
            special.update({'data.special.agility.mfd.one_and_half': stat.mfd.one_and_half});
            special.update({'data.special.agility.mfd.three_quarter': stat.mfd.three_quarter});
            special.update({'data.special.agility.mfd.half': stat.mfd.half});
            special.update({'data.special.agility.mfd.quarter': stat.mfd.quarter});
            special.update({'data.special.agility.mfd.tenth': stat.mfd.tenth});
            break;
        case "luck":
            special.update({'data.special.luck.mfd.full': stat.mfd.full});
            special.update({'data.special.luck.mfd.two': stat.mfd.two});
            special.update({'data.special.luck.mfd.one_and_half': stat.mfd.one_and_half});
            special.update({'data.special.luck.mfd.three_quarter': stat.mfd.three_quarter});
            special.update({'data.special.luck.mfd.half': stat.mfd.half});
            special.update({'data.special.luck.mfd.quarter': stat.mfd.quarter});
            special.update({'data.special.luck.mfd.tenth': stat.mfd.tenth});
            break;
        default:
            break;
    }

}

export function setSPECIAL(statName, specials, statChange, actor) {
    switch (statName) {
        case "strength":
            actor.update({'data.special.strength.val': statChange});
            specials.strength.val = statChange;
            calculateMFD(actor, specials.strength, statName);
            break;
        case "perception":
            actor.update({'data.special.perception.val': statChange});
            specials.perception.val = statChange;
            calculateMFD(actor, specials.perception);
            break;
        case "endurance":
            actor.update({'data.special.endurance.val': statChange});
            specials.endurance.val = statChange;
            calculateMFD(actor, specials.endurance);
            break;
        case "charisma":
            actor.update({'data.special.charisma.val': statChange});
            specials.charisma.val = statChange;
            calculateMFD(actor, specials.charisma);
            break;
        case "intelligence":
            actor.update({'data.special.intelligence.val': statChange});
            specials.intelligence.val = statChange;
            calculateMFD(actor, specials.intelligence);
            break;
        case "agility":
            actor.update({'data.special.agility.val': statChange});
            specials.agility.val = statChange;
            calculateMFD(actor,specials.agility);
            break;
        case "luck":
            actor.update({'data.special.luck.val': statChange});
            specials.luck.val = statChange;
            calculateMFD(actor,specials.luck);
            break;
        default:
            break;
    }
}

export function setSkillRank(skillname, skills, actor, statChange) {
    switch (skillname) {
        case "dig":
            actor.update({'data.skills.dig': statChange});
            skills.dig = statChange;
            break;
        case "melee":
            actor.update({'data.skills.melee': statChange});
            skills.melee = statChange;
            break;
        case "energy_weapons":
            actor.update({'data.skills.energy_weapons': statChange});
            skills.energy_weapons = statChange;
            break;
        case "explosives":
            actor.update({'data.skills.explosives': statChange});
            skills.explosives = statChange;
            break;
        case "lockpicking":
            actor.update({'data.skills.lockpicking': statChange});
            skills.lockpicking = statChange;
            break;
        case "big_guns":
            actor.update({'data.skills.big_guns': statChange});
            skills.big_guns = statChange;
            break;
        case "survival":
            actor.update({'data.skills.survival': statChange});
            skills.survival = statChange;
            break;
        case "unarmed":
            actor.update({'data.skills.unarmed': statChange});
            skills.unarmed = statChange;
            break;
        case "mercantile":
            actor.update({'data.skills.mercantile': statChange});
            skills.mercantile = statChange;
            break;
        case "speechcraft":
            actor.update({'data.skills.speechcraft': statChange});
            skills.speechcraft = statChange;
            break;
        case "magic":
            actor.update({'data.skills.magic': statChange});
            skills.magic = statChange;
            break;
        case "medicine":
            actor.update({'data.skills.medicine': statChange});
            skills.medicine = statChange;
            break;
        case "repair":
            actor.update({'data.skills.repair': statChange});
            skills.repair = statChange;
            break;
        case "science":
            actor.update({'data.skills.science': statChange});
            skills.science = statChange;
            break;
        case "flight":
            actor.update({'data.skills.flight': statChange});
            skills.flight = statChange;
            break;
        case "small_guns":
            actor.update({'data.skills.small_guns': statChange});
            skills.small_guns = statChange;
            break;
        case "sneak":
            actor.update({'data.skills.sneak': statChange});
            skills.sneak = statChange;
            break;
        default:
            break;
    }
}