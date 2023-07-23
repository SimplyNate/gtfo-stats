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

export interface MeleeEnhancement {
    DPS: number;
    'Stagger DPS': number;
}

export type EnhancedMeleeWeapon = MeleeWeapon & MeleeEnhancement;

import _melee from './melee.json';
// @ts-ignore
const melee: EnhancedMeleeWeapon[] = _melee;
for (const m of melee) {
    m.DPS = m.Damage.Charged * (60 / m['Charge Time']) / 60;
    m['Stagger DPS'] = m['Stagger Damage'].Charged * (60 / m['Charge Time']) / 60;
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
    meleeMaximums.Damage.Uncharged = Math.max(meleeMaximums.Damage.Uncharged, meleeWeapon.Damage.Uncharged);
    meleeMaximums.Damage.Charged = Math.max(meleeMaximums.Damage.Charged, meleeWeapon.Damage.Charged);
    meleeMaximums['Precision Damage'].Uncharged = Math.max(meleeMaximums['Precision Damage'].Uncharged, meleeWeapon['Precision Damage'].Uncharged);
    meleeMaximums['Precision Damage'].Charged = Math.max(meleeMaximums['Precision Damage'].Charged, meleeWeapon['Precision Damage'].Charged);
    meleeMaximums['Stagger Damage'].Uncharged = Math.max(meleeMaximums['Stagger Damage'].Uncharged, meleeWeapon['Stagger Damage'].Uncharged);
    meleeMaximums['Stagger Damage'].Charged = Math.max(meleeMaximums['Stagger Damage'].Charged, meleeWeapon['Stagger Damage'].Charged);
    meleeMaximums['Environmental Damage'].Uncharged = Math.max(meleeMaximums['Environmental Damage'].Uncharged, meleeWeapon['Environmental Damage'].Uncharged);
    meleeMaximums['Environmental Damage'].Charged = Math.max(meleeMaximums['Environmental Damage'].Charged, meleeWeapon['Environmental Damage'].Charged);
    meleeMaximums['Stealth Damage'].Uncharged = Math.max(meleeMaximums['Stealth Damage'].Uncharged, meleeWeapon['Stealth Damage'].Uncharged);
    meleeMaximums['Stealth Damage'].Charged = Math.max(meleeMaximums['Stealth Damage'].Charged, meleeWeapon['Stealth Damage'].Charged);
    meleeMaximums.Range = Math.max(meleeMaximums.Range, meleeWeapon.Range);
    meleeMaximums['Charge Time'] = Math.max(meleeMaximums['Charge Time'], meleeWeapon['Charge Time']);
    meleeMaximums['Charge Hold Duration'] = Math.max(meleeMaximums['Charge Hold Duration'], meleeWeapon['Charge Hold Duration']);
    meleeMaximums.DPS = Math.max(meleeMaximums.DPS, meleeWeapon.DPS);
    meleeMaximums['Stagger DPS'] = Math.max(meleeMaximums['Stagger DPS'], meleeWeapon['Stagger DPS']);
}

export default melee;
