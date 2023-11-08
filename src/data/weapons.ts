import { DamageEquipment, EnhancedDamageEquipment } from './equipment';

export interface Weapon extends DamageEquipment {
    Firemode: string;
    'Magazine Size': number;
    'Reload Time (s)': number;
    'Range (m)': number;
    'Rate of Fire': number;
    Pierces: boolean;
}

export class EnhancedWeapon extends EnhancedDamageEquipment {
    [index: string]: any;
    public equipment: Weapon;
    constructor(weapon: Weapon) {
        super(weapon);
        this.equipment = weapon;
    }
    get damagePerMag(): number {
        return this.damage * this.equipment['Magazine Size'];
    }
    get precisionPerMag(): number {
        return this.precision * this.equipment['Magazine Size'];
    }
    get totalDamage(): number {
        return this.damage * this.equipment['Max Ammo'];
    }
    get totalPrecision(): number {
        return this.precision * this.equipment['Max Ammo'];
    }
    get dps(): number {
        return this.damage * this.equipment['Rate of Fire'] / 60;
    }
    get effectiveDPS(): number {
        const bulletsPerSecond = this.equipment['Rate of Fire'] / 60;
        const secondsPerMag = this.equipment['Magazine Size'] / bulletsPerSecond;
        const totalTime = secondsPerMag + this.equipment['Reload Time (s)'];
        return this.damagePerMag / totalTime;
    }
    get precisionDPS(): number {
        return this.precision * this.equipment['Rate of Fire'] / 60;
    }
    get effectivePrecisionDPS(): number {
        const bulletsPerSecond = this.equipment['Rate of Fire'] / 60;
        const secondsPerMag = this.equipment['Magazine Size'] / bulletsPerSecond;
        const totalTime = secondsPerMag + this.equipment['Reload Time (s)'];
        return this.precisionPerMag / totalTime;
    }
    get keys(): {[index: string]: string} {
        return {
            ...super.keys,
            damagePerMag: 'Damage Per Mag',
            precisionPerMag: 'Precision Per Mag',
            totalDamage: 'Total Damage',
            totalPrecision: 'Total Precision',
            dps: 'DPS',
            effectiveDPS: 'Effective DPS',
            precisionDPS: 'Precision DPS',
            effectivePrecisionDPS: 'Effective Precision DPS',
        };
    }
    get equipmentKeys() {
        return [
            ...super.equipmentKeys,
            'Magazine Size',
            'Reload Time (s)',
            'Range (m)',
            'Rate of Fire',
        ];
    }
}

export function processWeapon(weapon: Weapon): EnhancedWeapon {
    return new EnhancedWeapon(weapon);
}

import _main from './main.json';
export const mainWeapons: EnhancedWeapon[] = [];

export interface MinMax {
    [index: string]: number;
}
export const mainMaximums: MinMax = {};
export const mainMinimums: MinMax = {};
for (const item of _main) {
    const processed: EnhancedWeapon = processWeapon(<Weapon>item);
    for (const key of Object.keys(processed.keys)) {
        if (mainMaximums[key]) {
            mainMaximums[key] = Math.max(mainMaximums[key], <number>processed[key]);
            mainMinimums[key] = Math.min(mainMinimums[key], <number>processed[key]);
        } else {
            mainMaximums[key] = <number>processed[key];
            mainMinimums[key] = <number>processed[key];
        }
    }
    for (const key of processed.equipmentKeys) {
        if (mainMaximums[key]) {
            mainMaximums[key] = Math.max(mainMaximums[key], <number>processed.equipment[key]);
            mainMinimums[key] = Math.min(mainMinimums[key], <number>processed.equipment[key]);
        } else {
            mainMaximums[key] = <number>processed.equipment[key];
            mainMinimums[key] = <number>processed.equipment[key];
        }
    }
    mainWeapons.push(processed);
}

import _special from './special.json';
export const specialWeapons: EnhancedWeapon[] = [];
export const specialMaximums: MinMax = {};
export const specialMinimums: MinMax = {};
for (const item of _special) {
    const processed: EnhancedWeapon = processWeapon(<Weapon>item);
    for (const key of Object.keys(processed.keys)) {
        if (specialMaximums[key]) {
            specialMaximums[key] = Math.max(specialMaximums[key], <number>processed[key]);
            specialMinimums[key] = Math.min(specialMinimums[key], <number>processed[key]);
        } else {
            specialMaximums[key] = <number>processed[key];
            specialMinimums[key] = <number>processed[key];
        }
    }
    for (const key of processed.equipmentKeys) {
        if (specialMaximums[key]) {
            specialMaximums[key] = Math.max(specialMaximums[key], <number>processed.equipment[key]);
            specialMinimums[key] = Math.min(specialMinimums[key], <number>processed.equipment[key]);
        } else {
            specialMaximums[key] = <number>processed.equipment[key];
            specialMinimums[key] = <number>processed.equipment[key];
        }
    }
    specialWeapons.push(processed);
}

export default {
    mainWeapons,
    specialWeapons,
};
