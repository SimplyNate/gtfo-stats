interface MeleeDamageType {
    Uncharged: number;
    Charged: number;
}

interface MeleeWeapon {
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

export default melee;
