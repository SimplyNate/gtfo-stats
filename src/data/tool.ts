import { Equipment, EnhancedEquipment, EnhancedAmmoEquipment, EnhancedDamageEquipment, AmmoEquipment, DamageEquipment } from './equipment';

const toolData = {
    sentry: [
    {
        "Name": "Mechatronic SGB3",
        "Type": "Burst Sentry",
        "Firemode": "Burst",
        "Max Ammo": 269,
        "Starting Ammo": 179.49,
        "Ammo Per Refill": 53.85,
        "Damage": 2.01,
        "Precision Multiplier": 1,
        "Stagger Multiplier": 1,
        "Rate of Fire": 165.14,
        "Range": 15,
        "Detection Range": 25,
        "Detection Speed": 1,
        "Biotracked Speed": 1,
        "Biotracked Ammo Usage Multiplier": 1
    },
    {
        "Name": "Rad Labs Meduza",
        "Type": "Auto Sentry",
        "Firemode": "Automatic",
        "Max Ammo": 875,
        "Starting Ammo": 583.33,
        "Ammo Per Refill": 175,
        "Damage": 0.71,
        "Precision Multiplier": 0.834,
        "Stagger Multiplier": 8,
        "Rate of Fire": 750,
        "Range": 10,
        "Detection Range": 25,
        "Detection Speed": 1,
        "Biotracked Speed": 1,
        "Biotracked Ammo Usage Multiplier": 1
    },
    {
        "Name": "AutoTek 51 RSG",
        "Type": "Sniper Sentry",
        "Firemode": "Semi-Automatic",
        "Max Ammo": 32,
        "Starting Ammo": 21.88,
        "Ammo Per Refill": 6.56,
        "Damage": 48.1,
        "Precision Multiplier": 1,
        "Stagger Multiplier": 1,
        "Rate of Fire": 20,
        "Range": 20,
        "Detection Range": 50,
        "Detection Speed": 3,
        "Biotracked Speed": 1.5,
        "Biotracked Ammo Usage Multiplier": 0.7
    },
    {
        "Name": "Mechatronic B5 LFR",
        "Type": "Shotgun Sentry",
        "Firemode": "Semi-Automatic",
        "Max Ammo": 58,
        "Starting Ammo": 38.89,
        "Ammo Per Refill": 11.67,
        "Damage": 15.05,
        "Precision Multiplier": 1,
        "Stagger Multiplier": 1,
        "Rate of Fire": 80,
        "Range": 4,
        "Detection Range": 10,
        "Detection Speed": 0.5,
        "Biotracked Speed": 0.125,
        "Biotracked Ammo Usage Multiplier": 0.5
    }] as SentryTool[],
    "tracker": {
        "Name": "D-Tek Optron IV",
        "Type": "Bio Tracker",
        "Cooldown": 8.5
    } as BioTracker,
    "c-foam": {
        "Name": "Stalwart G2",
        "Type": "C-Foam Launcher",
        "Max Ammo": 60,
        "Starting Ammo": 40,
        "Ammo Per Refill": 12
    } as CFoamLauncher,
    "mine-deployer": {
        "Name": "Krieger 04",
        "Type": "Mine Deployer",
        "Max Ammo": 8,
        "Starting Ammo": 5.5,
        "Ammo Per Refill": 1.5,
        "Damage": 50,
        "Precision Multiplier": 1,
        "Stagger Multiplier": 1
    } as MineDeployer
};

export interface SentryTool extends DamageEquipment {
    Firemode: string;
    'Precision Multiplier': number;
    'Stagger Multiplier': number;
    'Rate of Fire': number;
    Range: number;
    'Detection Range': number;
    'Detection Speed': number;
    'Biotracked Speed': number;
    'Biotracked Ammo Usage Multiplier': number;
}

export interface BioTracker extends Equipment {
    Cooldown: number;
}

export interface CFoamLauncher extends AmmoEquipment {}

export interface MineDeployer extends DamageEquipment {}

export class EnhancedSentryTool extends EnhancedDamageEquipment {
    public equipment: SentryTool;
    private sentryCPUModifier: number;
    private shortRangeDamageModifier: number;
    constructor(tool: SentryTool) {
        super(tool);
        this.equipment = tool;
        this.sentryCPUModifier = 1;
        this.shortRangeDamageModifier = 1;
    }
    set cpuModifier(value: number) {
        this.sentryCPUModifier = value;
    }
    get precision() {
        return this.equipment.Damage * this.equipment['Precision Multiplier'] * this.sentryDamageModifier;
    }
    get stagger() {
        return this.equipment.Damage * this.equipment['Stagger Multiplier'] * this.sentryDamageModifier;
    }
    get cpuSpeed() {
        return this.equipment['Detection Speed'] - (this.equipment['Detection Speed'] * this.sentryCPUModifier / 2);
    }
    get biotrackSpeed() {
        return this.equipment['Biotracked Speed'] - (this.equipment['Biotracked Speed'] * this.sentryCPUModifier / 2);
    }
    get shortRangeDamage() {
        return this.equipment.Damage * this.shortRangeDamageModifier;
    }
    set srDamageModifier(value: number) {
        this.shortRangeDamageModifier = 1 + value;
    }
    get keys() {
        return {
            ...super.keys,
            cpuSpeed: 'Detection Speed',
            biotrackSpeed: 'Biotracked Detection Speed',
            shortRangeDamage: 'Short Range Damage',
        }
    }
    get equipmentKeys() {
        return [
            'Rate of Fire',
            'Range',
            'Detection Range',
            'Biotracked Ammo Usage Multiplier',
        ];
    }
}

export class EnhancedBioTracker extends EnhancedEquipment {
    equipment: BioTracker;
    cooldownModifier: number;
    constructor(tracker: BioTracker) {
        super(tracker);
        this.equipment = tracker;
        this.cooldownModifier = 0;
    }
    set cooldown(value: number) {
        this.cooldownModifier = value;
    }
    get cooldown() {
        return this.equipment.Cooldown - (this.equipment.Cooldown * this.cooldownModifier / 2);
    }
}

export class EnhancedCFoamLauncher extends EnhancedAmmoEquipment {
    equipment: CFoamLauncher;

    constructor(launcher: CFoamLauncher) {
        super(launcher);
        this.equipment = launcher;
    }
}

export class EnhancedMineDeployer extends EnhancedDamageEquipment {
    equipment: MineDeployer;

    constructor(deployer: MineDeployer) {
        super(deployer);
        this.equipment = deployer;
    }
}
export const sentries: EnhancedSentryTool[] = [];
for (const tool of toolData.sentry) {
    sentries.push(new EnhancedSentryTool(tool));
}
export const bioTracker = new EnhancedBioTracker(toolData.tracker);
export const cFoamLauncher = new EnhancedCFoamLauncher(toolData['c-foam']);
export const mineDeployer = new EnhancedMineDeployer(toolData['mine-deployer']);

export default {
    sentries,
    bioTracker,
    cFoamLauncher,
    mineDeployer,
};
