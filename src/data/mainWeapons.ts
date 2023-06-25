export interface Weapon {
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

import _main from './main.json';
const mainWeapons: Weapon[] = _main;
export default mainWeapons;
