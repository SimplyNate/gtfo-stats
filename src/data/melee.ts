import { Equipment, EnhancedEquipment } from './equipment';

interface MeleeDamageType {
    Uncharged: number;
    Charged: number;
}

export interface MeleeWeapon extends Equipment {
    Damage: MeleeDamageType;
    'Precision Multiplier': MeleeDamageType;
    'Stagger Multiplier': MeleeDamageType;
    'Environmental Multiplier': MeleeDamageType;
    'Stealth Multiplier': MeleeDamageType;
    'Backstab Multiplier': MeleeDamageType;
    Range: number;
    'Charge Time': number;
    'Charge Hold Duration': number;
    'Noise Level': string;
}

export class EnhancedMeleeWeapon extends EnhancedEquipment {
    equipment: MeleeWeapon;
    private damageModifier: number;
    constructor(meleeWeapon: MeleeWeapon) {
        super(meleeWeapon);
        this.equipment = meleeWeapon;
        this.damageModifier = 1;
    }
    get damage(): MeleeDamageType {
        return {
            Uncharged: this.equipment.Damage.Uncharged * this.damageModifier,
            Charged: this.equipment.Damage.Charged * this.damageModifier,
        };
    }
    set modifier(value: number) {
        this.damageModifier = 1 + value;
    }
    get precision(): MeleeDamageType {
        return {
            Uncharged: this.damage.Uncharged * this.equipment['Precision Multiplier'].Uncharged,
            Charged: this.damage.Charged * this.equipment['Precision Multiplier'].Charged,
        };
    }
    get stagger(): MeleeDamageType {
        return {
            Uncharged: this.damage.Uncharged * this.equipment['Stagger Multiplier'].Uncharged,
            Charged: this.damage.Charged * this.equipment['Stagger Multiplier'].Charged,
        };
    }
    get environmental(): MeleeDamageType {
        return {
            Uncharged: this.damage.Uncharged * this.equipment['Environmental Multiplier'].Uncharged,
            Charged: this.damage.Charged * this.equipment['Environmental Multiplier'].Charged,
        };
    }
    get stealth(): MeleeDamageType {
        return {
            Uncharged: this.damage.Uncharged * this.equipment['Stealth Multiplier'].Uncharged,
            Charged: this.damage.Charged * this.equipment['Stealth Multiplier'].Charged,
        };
    }
    get stealthPrecision(): MeleeDamageType {
        return {
            Uncharged: this.damage.Uncharged * this.equipment['Stealth Multiplier'].Uncharged * this.equipment['Precision Multiplier'].Uncharged,
            Charged: this.damage.Charged * this.equipment['Stealth Multiplier'].Charged * this.equipment['Precision Multiplier'].Charged,
        };
    }
    get dps(): MeleeDamageType {
        return {
            Uncharged: this.damage.Uncharged * (60 / this.equipment['Charge Time']) / 60,
            Charged: this.damage.Charged * (60 / this.equipment['Charge Time']) / 60,
        };
    }
    get staggerDPS(): MeleeDamageType {
        return {
            Uncharged: this.stagger.Uncharged * (60 / this.equipment['Charge Time']) / 60,
            Charged: this.stagger.Charged * (60 / this.equipment['Charge Time']) / 60,
        };
    }
}

import _melee from './melee.json';
const melee: EnhancedMeleeWeapon[] = [];
for (const m of _melee) {
    melee.push(new EnhancedMeleeWeapon(m))
}

export const meleeMaximums = {
    damage: {
        Uncharged: -Infinity,
        Charged: -Infinity,
    },
    precision: {
        Uncharged: -Infinity,
        Charged: -Infinity,
    },
    stagger: {
        Uncharged: -Infinity,
        Charged: -Infinity,
    },
    environmental: {
        Uncharged: -Infinity,
        Charged: -Infinity,
    },
    stealth: {
        Uncharged: -Infinity,
        Charged: -Infinity,
    },
    stealthPrecision: {
        Uncharged: -Infinity,
        Charged: -Infinity,
    },
    dps: {
        Uncharged: -Infinity,
        Charged: -Infinity,
    },
    staggerDPS: {
        Uncharged: -Infinity,
        Charged: -Infinity,
    },
    equipment: {
        Range: -Infinity,
        'Charge Time': -Infinity,
        'Charge Hold Duration': -Infinity,
    },
};

for (const meleeWeapon of melee) {
    meleeMaximums.damage.Uncharged = Math.max(meleeMaximums.damage.Uncharged, meleeWeapon.damage.Uncharged);
    meleeMaximums.damage.Charged = Math.max(meleeMaximums.damage.Charged, meleeWeapon.damage.Charged);
    meleeMaximums.precision.Uncharged = Math.max(meleeMaximums.precision.Uncharged, meleeWeapon.precision.Uncharged);
    meleeMaximums.precision.Charged = Math.max(meleeMaximums.precision.Charged, meleeWeapon.precision.Charged);
    meleeMaximums.stagger.Uncharged = Math.max(meleeMaximums.stagger.Uncharged, meleeWeapon.stagger.Uncharged);
    meleeMaximums.stagger.Charged = Math.max(meleeMaximums.stagger.Charged, meleeWeapon.stagger.Charged);
    meleeMaximums.environmental.Uncharged = Math.max(meleeMaximums.environmental.Uncharged, meleeWeapon.environmental.Uncharged);
    meleeMaximums.environmental.Charged = Math.max(meleeMaximums.environmental.Charged, meleeWeapon.environmental.Charged);
    meleeMaximums.stealth.Uncharged = Math.max(meleeMaximums.stealth.Uncharged, meleeWeapon.stealth.Uncharged);
    meleeMaximums.stealth.Charged = Math.max(meleeMaximums.stealth.Charged, meleeWeapon.stealth.Charged);
    meleeMaximums.stealthPrecision.Uncharged = Math.max(meleeMaximums.stealthPrecision.Uncharged, meleeWeapon.stealthPrecision.Uncharged);
    meleeMaximums.stealthPrecision.Charged = Math.max(meleeMaximums.stealthPrecision.Charged, meleeWeapon.stealthPrecision.Charged);
    meleeMaximums.equipment.Range = Math.max(meleeMaximums.equipment.Range, meleeWeapon.equipment.Range);
    meleeMaximums.equipment['Charge Time'] = Math.max(meleeMaximums.equipment['Charge Time'], meleeWeapon.equipment['Charge Time']);
    meleeMaximums.equipment['Charge Hold Duration'] = Math.max(meleeMaximums.equipment['Charge Hold Duration'], meleeWeapon.equipment['Charge Hold Duration']);
    meleeMaximums.dps.Uncharged = Math.max(meleeMaximums.dps.Uncharged, meleeWeapon.dps.Uncharged);
    meleeMaximums.dps.Charged = Math.max(meleeMaximums.dps.Charged, meleeWeapon.dps.Charged);
    meleeMaximums.staggerDPS.Uncharged = Math.max(meleeMaximums.staggerDPS.Uncharged, meleeWeapon.staggerDPS.Uncharged);
    meleeMaximums.staggerDPS.Charged = Math.max(meleeMaximums.staggerDPS.Charged, meleeWeapon.staggerDPS.Charged);
}

export default melee;
