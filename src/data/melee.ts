interface MeleeDamageType {
    Uncharged: number;
    Charged: number;
}

export interface MeleeWeapon {
    Name: string;
    Type: string;
    Damage: MeleeDamageType;
    'Precision Multiplier': MeleeDamageType;
    'Precision Damage': MeleeDamageType;
    'Stagger Multiplier': MeleeDamageType;
    'Stagger Damage': MeleeDamageType;
    'Environmental Multiplier': MeleeDamageType;
    'Environmental Damage': MeleeDamageType;
    'Stealth Multiplier': MeleeDamageType;
    'Stealth Damage': MeleeDamageType;
    Range: number;
    'Charge Time': number;
    'Charge Hold Duration': number;
    'Noise Level': string;
}

export class EnhancedMeleeWeapon {
    weapon: MeleeWeapon;
    private damageModifier: number;
    constructor(meleeWeapon: MeleeWeapon) {
        this.weapon = meleeWeapon;
        this.damageModifier = 1;
    }
    get Name(): string {
        return this.weapon.Name;
    }
    get Type(): string {
        return this.weapon.Type;
    }
    get damage(): MeleeDamageType {
        return {
            Uncharged: this.weapon.Damage.Uncharged * this.damageModifier,
            Charged: this.weapon.Damage.Charged * this.damageModifier,
        };
    }
    set modifier(value: number) {
        this.damageModifier = 1 + value;
    }
    get precision(): MeleeDamageType {
        return {
            Uncharged: this.damage.Uncharged * this.weapon['Precision Multiplier'].Uncharged,
            Charged: this.damage.Charged * this.weapon['Precision Multiplier'].Charged,
        };
    }
    get stagger(): MeleeDamageType {
        return {
            Uncharged: this.damage.Uncharged * this.weapon['Stagger Multiplier'].Uncharged,
            Charged: this.damage.Charged * this.weapon['Stagger Multiplier'].Charged,
        };
    }
    get environmental(): MeleeDamageType {
        return {
            Uncharged: this.damage.Uncharged * this.weapon['Environmental Multiplier'].Uncharged,
            Charged: this.damage.Charged * this.weapon['Environmental Multiplier'].Charged,
        };
    }
    get stealthNormal(): MeleeDamageType {
        return {
            Uncharged: this.damage.Uncharged * this.weapon['Stealth Multiplier'].Uncharged,
            Charged: this.damage.Charged * this.weapon['Stealth Multiplier'].Charged,
        };
    }
    get stealthPrecision(): MeleeDamageType {
        return {
            Uncharged: this.damage.Uncharged * this.weapon['Stealth Multiplier'].Uncharged * this.weapon['Precision Multiplier'].Uncharged,
            Charged: this.damage.Charged * this.weapon['Stealth Multiplier'].Charged * this.weapon['Precision Multiplier'].Charged,
        };
    }
    get dps(): MeleeDamageType {
        return {
            Uncharged: this.damage.Uncharged * (60 / this.weapon['Charge Time']) / 60,
            Charged: this.damage.Charged * (60 / this.weapon['Charge Time']) / 60,
        };
    }
    get staggerDPS(): MeleeDamageType {
        return {
            Uncharged: this.stagger.Uncharged * (60 / this.weapon['Charge Time']) / 60,
            Charged: this.stagger.Charged * (60 / this.weapon['Charge Time']) / 60,
        };
    }
}

import _melee from './melee.json';
const melee: EnhancedMeleeWeapon[] = [];
for (const m of _melee) {
    melee.push(new EnhancedMeleeWeapon(m))
}

export const meleeMaximums = {
    Damage: {
        Uncharged: -Infinity,
        Charged: -Infinity,
    },
    'Precision Multiplier': {
        Uncharged: -Infinity,
        Charged: -Infinity,
    },
    'Precision Damage': {
        Uncharged: -Infinity,
        Charged: -Infinity,
    },
    'Stagger Multiplier': {
        Uncharged: -Infinity,
        Charged: -Infinity,
    },
    'Stagger Damage': {
        Uncharged: -Infinity,
        Charged: -Infinity,
    },
    'Environmental Multiplier': {
        Uncharged: -Infinity,
        Charged: -Infinity,
    },
    'Environmental Damage': {
        Uncharged: -Infinity,
        Charged: -Infinity,
    },
    'Stealth Multiplier': {
        Uncharged: -Infinity,
        Charged: -Infinity,
    },
    'Stealth Damage': {
        Uncharged: -Infinity,
        Charged: -Infinity,
    },
    Range: -Infinity,
    'Charge Time': -Infinity,
    'Charge Hold Duration': -Infinity,
    DPS: -Infinity,
   'Stagger DPS': -Infinity,
};

for (const meleeWeapon of melee) {
    meleeMaximums.Damage.Uncharged = Math.max(meleeMaximums.Damage.Uncharged, meleeWeapon.weapon.Damage.Uncharged);
    meleeMaximums.Damage.Charged = Math.max(meleeMaximums.Damage.Charged, meleeWeapon.weapon.Damage.Charged);
    meleeMaximums['Precision Damage'].Uncharged = Math.max(meleeMaximums['Precision Damage'].Uncharged, meleeWeapon.precision.Uncharged);
    meleeMaximums['Precision Damage'].Charged = Math.max(meleeMaximums['Precision Damage'].Charged, meleeWeapon.precision.Charged);
    meleeMaximums['Stagger Damage'].Uncharged = Math.max(meleeMaximums['Stagger Damage'].Uncharged, meleeWeapon.stagger.Uncharged);
    meleeMaximums['Stagger Damage'].Charged = Math.max(meleeMaximums['Stagger Damage'].Charged, meleeWeapon.stagger.Charged);
    meleeMaximums['Environmental Damage'].Uncharged = Math.max(meleeMaximums['Environmental Damage'].Uncharged, meleeWeapon.environmental.Uncharged);
    meleeMaximums['Environmental Damage'].Charged = Math.max(meleeMaximums['Environmental Damage'].Charged, meleeWeapon.environmental.Charged);
    meleeMaximums['Stealth Damage'].Uncharged = Math.max(meleeMaximums['Stealth Damage'].Uncharged, meleeWeapon.stealthNormal.Uncharged);
    meleeMaximums['Stealth Damage'].Charged = Math.max(meleeMaximums['Stealth Damage'].Charged, meleeWeapon.stealthNormal.Charged);
    meleeMaximums.Range = Math.max(meleeMaximums.Range, meleeWeapon.weapon.Range);
    meleeMaximums['Charge Time'] = Math.max(meleeMaximums['Charge Time'], meleeWeapon.weapon['Charge Time']);
    meleeMaximums['Charge Hold Duration'] = Math.max(meleeMaximums['Charge Hold Duration'], meleeWeapon.weapon['Charge Hold Duration']);
    meleeMaximums.DPS = Math.max(meleeMaximums.DPS, meleeWeapon.dps.Charged);
    meleeMaximums['Stagger DPS'] = Math.max(meleeMaximums['Stagger DPS'], meleeWeapon.staggerDPS.Charged);
}

export default melee;
