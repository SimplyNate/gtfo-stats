export interface Weapon {
    [index: string]: string | number | boolean;
    Name: string;
    Type: string;
    Firemode: string;
    'Max Ammo': number;
    'Magazine Size': number;
    Damage: number;
    'Precision Multiplier': number;
    'Precision Damage': number;
    'Stagger Multiplier': number;
    'Damage Per Mag': number;
    'Precision Per Mag': number;
    'Headshot Damage': number;
    'Back Headshot Damage': number;
    'Reload Time (s)': number;
    'Range (m)': number;
    'Rate of Fire': number;
    Pierces: boolean;
}

export interface Enhancement {
    DPS: number;
    'Effective DPS': number;
    'Precision DPS': number;
    'Effective Precision DPS': number;
}

export type EnhancedWeapon = Weapon & Enhancement;

export function calculateDPS(weapon: Weapon) {
    return weapon.Damage * weapon['Rate of Fire'] / 60;
}

export function calculatePDPS(weapon: Weapon) {
    return weapon.Damage * weapon['Precision Multiplier'] * weapon['Rate of Fire'] / 60;
}

export function calculateEffectivePDPS(weapon: Weapon) {

}

export function calculateEffectiveDPS(weapon: Weapon) {
    const bulletsPerSecond = weapon['Rate of Fire'] / 60;
    const secondsPerMag = weapon['Magazine Size'] / bulletsPerSecond;
    const totalTime = secondsPerMag + weapon['Reload Time (s)'];
    return weapon['Damage Per Mag'] / totalTime;
}

import _main from './main.json';
const mainWeapons: EnhancedWeapon[] = [];
for (const item of _main) {
    mainWeapons.push({
        ...item,
        DPS: calculateDPS(item),
        'Effective DPS': calculateEffectiveDPS(item),
    });
}
export default mainWeapons;
