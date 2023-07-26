import Weapon from "../components/Weapon.vue";

export interface Weapon {
    [index: string]: string | number | boolean;
    Name: string;
    Type: string;
    Firemode: string;
    'Max Ammo': number;
    'Magazine Size': number;
    'Starting Ammo': number;
    'Ammo Per Refill': number;
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

export class EnhancedWeapon {
    public weapon: Weapon;
    private damageModifier: number;
    constructor(weapon: Weapon) {
        this.weapon = weapon;
        this.damageModifier = 1;
    }
    get Name(): string {
        return this.weapon.Name;
    }
    get Type(): string {
        return this.weapon.Type;
    }
    get damage(): number {
        return this.weapon.Damage * this.damageModifier;
    }
    set modifier(value: number) {
        this.damageModifier = 1 + value;
    }
    get precision(): number {
        return this.damage * this.weapon['Precision Multiplier'];
    }
    get stagger(): number {
        return this.damage * this.weapon['Stagger Multiplier'];
    }
    get damagePerMag(): number {
        return this.damage * this.weapon['Magazine Size'];
    }
    get precisionPerMag(): number {
        return this.precision * this.weapon['Magazine Size'];
    }
    get totalDamage(): number {
        return this.damage * this.weapon['Max Ammo'];
    }
    get dps(): number {
        return this.damage * this.weapon['Rate of Fire'] / 60;
    }
    get effectiveDPS(): number {
        const bulletsPerSecond = this.weapon['Rate of Fire'] / 60;
        const secondsPerMag = this.weapon['Magazine Size'] / bulletsPerSecond;
        const totalTime = secondsPerMag + this.weapon['Reload Time (s)'];
        return this.damagePerMag / totalTime;
    }
    get precisionDPS(): number {
        return this.precision * this.weapon['Rate of Fire'] / 60;
    }
    get effectivePrecisionDPS(): number {
        const bulletsPerSecond = this.weapon['Rate of Fire'] / 60;
        const secondsPerMag = this.weapon['Magazine Size'] / bulletsPerSecond;
        const totalTime = secondsPerMag + this.weapon['Reload Time (s)'];
        return this.precisionPerMag / totalTime;
    }
}

export function processWeapon(weapon: Weapon): EnhancedWeapon {
    return new EnhancedWeapon(weapon);
}

import _main from './main.json';
export const mainWeapons: EnhancedWeapon[] = [];

export interface MinMax {
    [index: string]: number;
    'Back Headshot Damage': number;
    'Damage Per Mag': number;
    'Effective DPS': number;
    'Effective Precision DPS': number;
    'Headshot Damage': number;
    'Magazine Size': number;
    'Starting Ammo': number;
    'Ammo Per Refill': number;
    'Max Ammo': number;
    'Precision DPS': number;
    'Precision Damage': number;
    'Precision Multiplier': number;
    'Precision Per Mag': number;
    'Range (m)': number;
    'Rate of Fire': number;
    'Reload Time (s)': number;
    'Stagger Multiplier': number;
    'Stagger Damage': number;
    'Total Damage': number;
    DPS: number;
    Damage: number;
}
export const mainMaximums: MinMax = {
    'Back Headshot Damage': 0,
    'Damage Per Mag': 0,
    'Effective DPS': 0,
    'Effective Precision DPS': 0,
    'Headshot Damage': 0,
    'Magazine Size': 0,
    'Starting Ammo': 0,
    'Ammo Per Refill': 0,
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
};
export const mainMinimums: MinMax = {
    'Back Headshot Damage': Infinity,
    'Damage Per Mag': Infinity,
    'Effective DPS': Infinity,
    'Effective Precision DPS': Infinity,
    'Headshot Damage': Infinity,
    'Magazine Size': Infinity,
    'Starting Ammo': Infinity,
    'Ammo Per Refill': Infinity,
    'Max Ammo': Infinity,
    'Precision DPS': Infinity,
    'Precision Damage': Infinity,
    'Precision Multiplier': Infinity,
    'Precision Per Mag': Infinity,
    'Range (m)': Infinity,
    'Rate of Fire': Infinity,
    'Reload Time (s)': Infinity,
    'Stagger Multiplier': Infinity,
    'Stagger Damage': Infinity,
    'Total Damage': Infinity,
    DPS: Infinity,
    Damage: Infinity,
};
for (const item of _main) {
    const processed: EnhancedWeapon = processWeapon(item);
    for (const key of Object.keys(processed.weapon)) {
        if (Number.isFinite(processed.weapon[key])) {
            mainMaximums[key] = Math.max(mainMaximums[key], <number>processed.weapon[key]);
            mainMinimums[key] = Math.min(mainMinimums[key], <number>processed.weapon[key]);
        }
    }
    mainMaximums.DPS = Math.max(mainMaximums.DPS, processed.dps);
    mainMinimums.DPS = Math.min(mainMinimums.DPS, processed.dps);
    mainMaximums["Effective DPS"] = Math.max(mainMaximums["Effective DPS"], processed.effectiveDPS);
    mainMinimums["Effective DPS"] = Math.min(mainMinimums["Effective DPS"], processed.effectiveDPS);
    mainMaximums["Precision DPS"] = Math.max(mainMaximums["Precision DPS"], processed.precisionDPS);
    mainMinimums["Precision DPS"] = Math.min(mainMinimums["Precision DPS"], processed.precisionDPS);
    mainMaximums["Effective Precision DPS"] = Math.max(mainMaximums["Effective Precision DPS"], processed.effectivePrecisionDPS);
    mainMinimums["Effective Precision DPS"] = Math.min(mainMinimums["Effective Precision DPS"], processed.effectivePrecisionDPS);
    mainMaximums["Total Damage"] = Math.max(mainMaximums["Total Damage"], processed.totalDamage);
    mainMinimums["Total Damage"] = Math.min(mainMinimums["Total Damage"], processed.totalDamage);
    mainMaximums["Stagger Damage"] = Math.max(mainMaximums["Stagger Damage"], processed.stagger);
    mainMinimums["Stagger Damage"] = Math.min(mainMinimums["Stagger Damage"], processed.stagger);
    mainWeapons.push(processed);
}

import _special from './special.json';
export const specialWeapons: EnhancedWeapon[] = [];
export const specialMaximums: MinMax = {
    'Back Headshot Damage': 0,
    'Damage Per Mag': 0,
    'Effective DPS': 0,
    'Effective Precision DPS': 0,
    'Headshot Damage': 0,
    'Magazine Size': 0,
    'Max Ammo': 0,
    'Starting Ammo': 0,
    'Ammo Per Refill': 0,
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
};
export const specialMinimums: MinMax = {
    'Back Headshot Damage': Infinity,
    'Damage Per Mag': Infinity,
    'Effective DPS': Infinity,
    'Effective Precision DPS': Infinity,
    'Headshot Damage': Infinity,
    'Magazine Size': Infinity,
    'Max Ammo': Infinity,
    'Starting Ammo': Infinity,
    'Ammo Per Refill': Infinity,
    'Precision DPS': Infinity,
    'Precision Damage': Infinity,
    'Precision Multiplier': Infinity,
    'Precision Per Mag': Infinity,
    'Range (m)': Infinity,
    'Rate of Fire': Infinity,
    'Reload Time (s)': Infinity,
    'Stagger Multiplier': Infinity,
    'Stagger Damage': Infinity,
    'Total Damage': Infinity,
    DPS: Infinity,
    Damage: Infinity,
};
for (const item of _special) {
    const processed: EnhancedWeapon = processWeapon(item);
    for (const key of Object.keys(processed.weapon)) {
        if (Number.isFinite(processed.weapon[key])) {
            specialMaximums[key] = Math.max(specialMaximums[key], <number>processed.weapon[key])
            specialMinimums[key] = Math.min(specialMinimums[key], <number>processed.weapon[key]);
        }
    }
    specialMaximums.DPS = Math.max(specialMaximums.DPS, processed.dps);
    specialMinimums.DPS = Math.min(specialMinimums.DPS, processed.dps);
    specialMaximums["Effective DPS"] = Math.max(specialMaximums["Effective DPS"], processed.effectiveDPS);
    specialMinimums["Effective DPS"] = Math.min(specialMinimums["Effective DPS"], processed.effectiveDPS);
    specialMaximums["Precision DPS"] = Math.max(specialMaximums["Precision DPS"], processed.precisionDPS);
    specialMinimums["Precision DPS"] = Math.min(specialMinimums["Precision DPS"], processed.precisionDPS);
    specialMaximums["Effective Precision DPS"] = Math.max(specialMaximums["Effective Precision DPS"], processed.effectivePrecisionDPS);
    specialMinimums["Effective Precision DPS"] = Math.min(specialMinimums["Effective Precision DPS"], processed.effectivePrecisionDPS);
    specialMaximums["Total Damage"] = Math.max(specialMaximums["Total Damage"], processed.totalDamage);
    specialMinimums["Total Damage"] = Math.min(specialMinimums["Total Damage"], processed.totalDamage);
    specialMaximums["Stagger Damage"] = Math.max(specialMaximums["Stagger Damage"], processed.stagger);
    specialMinimums["Stagger Damage"] = Math.min(specialMinimums["Stagger Damage"], processed.stagger);
    specialWeapons.push(processed);
}

export default {
    mainWeapons,
    specialWeapons,
};
