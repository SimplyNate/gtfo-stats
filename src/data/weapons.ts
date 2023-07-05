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
    'Stagger Damage': number;
    'Total Damage': number;
    DPS: number;
    'Effective DPS': number;
    'Precision DPS': number;
    'Effective Precision DPS': number;
}

export type EnhancedWeapon = Weapon & Enhancement;

export function calculateStaggerDamage(weapon: Weapon): number {
    return weapon.Damage * weapon['Stagger Multiplier'];
}

export function calculateTotalDamage(weapon: Weapon): number {
    return weapon.Damage * weapon['Max Ammo'];
}

export function calculateDPS(weapon: Weapon): number {
    return weapon.Damage * weapon['Rate of Fire'] / 60;
}

export function calculatePDPS(weapon: Weapon): number {
    return weapon.Damage * weapon['Precision Multiplier'] * weapon['Rate of Fire'] / 60;
}

export function calculateEffectivePDPS(weapon: Weapon): number {
    const bulletsPerSecond = weapon['Rate of Fire'] / 60;
    const secondsPerMag = weapon['Magazine Size'] / bulletsPerSecond;
    const totalTime = secondsPerMag + weapon['Reload Time (s)'];
    return weapon['Precision Per Mag'] / totalTime;
}

export function calculateEffectiveDPS(weapon: Weapon): number {
    const bulletsPerSecond = weapon['Rate of Fire'] / 60;
    const secondsPerMag = weapon['Magazine Size'] / bulletsPerSecond;
    const totalTime = secondsPerMag + weapon['Reload Time (s)'];
    return weapon['Damage Per Mag'] / totalTime;
}

export function processWeapon(weapon: Weapon): EnhancedWeapon {
    return {
        ...weapon,
        'Stagger Damage': calculateStaggerDamage(weapon),
        'Total Damage': calculateTotalDamage(weapon),
        DPS: calculateDPS(weapon),
        'Effective DPS': calculateEffectiveDPS(weapon),
        'Precision DPS': calculatePDPS(weapon),
        'Effective Precision DPS': calculateEffectivePDPS(weapon),
    };
}

import _main from './main.json';
export const mainWeapons: EnhancedWeapon[] = [];
export const mainMaximums: EnhancedWeapon = {
    'Back Headshot Damage': 0,
    'Damage Per Mag': 0,
    'Effective DPS': 0,
    'Effective Precision DPS': 0,
    'Headshot Damage': 0,
    'Magazine Size': 0,
    'Max Ammo': 0,
    'Precision DPS': 0,
    'Precision Damage': 0,
    'Precision Multiplier': 0,
    'Precision Per Mag': 0,
    'Range (m)': 0,
    'Rate of Fire': 0,
    'Reload Time (s)': 0,
    'Stagger Multiplier': 0,
    'Stagger Damage': 0,
    'Total Damage': 0,
    DPS: 0,
    Damage: 0,
    Firemode: '',
    Name: '',
    Pierces: false,
    Type: ''
};
for (const item of _main) {
    const processed: EnhancedWeapon = processWeapon(item);
    for (const key of Object.keys(processed)) {
        if (Number.isFinite(processed[key])) {
            mainMaximums[key] = Math.max(<number>mainMaximums[key], <number>processed[key]);
        }
    }
    mainWeapons.push(processed);
}

import _special from './special.json';
export const specialWeapons: EnhancedWeapon[] = [];
export const specialMaximums: EnhancedWeapon = {
    'Back Headshot Damage': 0,
    'Damage Per Mag': 0,
    'Effective DPS': 0,
    'Effective Precision DPS': 0,
    'Headshot Damage': 0,
    'Magazine Size': 0,
    'Max Ammo': 0,
    'Precision DPS': 0,
    'Precision Damage': 0,
    'Precision Multiplier': 0,
    'Precision Per Mag': 0,
    'Range (m)': 0,
    'Rate of Fire': 0,
    'Reload Time (s)': 0,
    'Stagger Multiplier': 0,
    'Stagger Damage': 0,
    'Total Damage': 0,
    DPS: 0,
    Damage: 0,
    Firemode: '',
    Name: '',
    Pierces: false,
    Type: ''
};
for (const item of _special) {
    const processed: EnhancedWeapon = processWeapon(item);
    for (const key of Object.keys(processed)) {
        if (Number.isFinite(processed[key])) {
            specialMaximums[key] = Math.max(<number>specialMaximums[key], <number>processed[key]);
        }
    }
    specialWeapons.push(processed);
}



export default {
    mainWeapons,
    specialWeapons,
};
