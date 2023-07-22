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

import _melee from './melee.json';
const melee: MeleeWeapon[] = _melee;

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
};

for (const meleeWeapon of melee) {
    meleeMaximums.Damage.Uncharged = Math.max(meleeMaximums.Damage.Uncharged, meleeWeapon.Damage.Uncharged);
}

export default melee;
