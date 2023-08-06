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
        "Total Damage": 540.69,
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
        "Total Damage": 621.25,
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
        "Total Damage": 1539.2,
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
        "Total Damage": 872.9,
        "Rate of Fire": 80,
        "Range": 4,
        "Detection Range": 10,
        "Detection Speed": 0.5,
        "Biotracked Speed": 0.125,
        "Biotracked Ammo Usage Multiplier": 0.5
    }
] as SentryTool[],
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
        "Damage": 50
    } as MineDeployer
};

export interface Tool {
    [index: string]: string | number;
    Name: string;
    Type: string;
}

export interface AmmoTool extends Tool {
    'Max Ammo': number;
    'Starting Ammo': number;
    'Ammo Per Refill': number;
}

export interface DamageTool extends AmmoTool {
    Damage: number;
}

export interface SentryTool extends DamageTool {
    Firemode: string;
    'Precision Multiplier': number;
    'Stagger Multiplier': number;
    'Total Damage': number;
    'Rate of Fire': number;
    Range: number;
    'Detection Range': number;
    'Detection Speed': number;
    'Biotracked Speed': number;
    'Biotracked Ammo Usage Multiplier': number;
}

export interface BioTracker extends Tool {
    Cooldown: number;
}

export interface CFoamLauncher extends AmmoTool {}

export interface MineDeployer extends DamageTool {}

export abstract class EnhancedTool {
    [index: string]: any;
    public tool: Tool;

    protected constructor(tool: Tool) {
        this.tool = tool;
    }
    get Name(): string {
        return this.tool.Name;
    }
    get Type(): string {
        return this.tool.Type;
    }
}

abstract class EnhancedAmmoTool extends EnhancedTool {
    public tool: AmmoTool;
    protected toolAmmoModifier: number;
    protected toolRefillModifier: number;

    protected constructor(tool: AmmoTool) {
        super(tool);
        // Make VLS happy
        this.tool = tool;
        this.toolAmmoModifier = 1;
        this.toolRefillModifier = 1;
    }

    set ammoModifier(value: number) {
        this.toolAmmoModifier = 1 + value;
    }
    set refillModifier(value: number) {
        this.toolRefillModifier = 1 + value;
    }
    get startingAmmo() {
        return this.tool['Starting Ammo'] * this.toolAmmoModifier;
    }
    get ammoPerRefill() {
        return this.tool['Ammo Per Refill'] * this.toolRefillModifier;
    }
}

abstract class EnhancedDamageTool extends EnhancedAmmoTool {
    public tool: DamageTool;
    protected toolDamageModifier: number;

    protected constructor(tool: DamageTool) {
        super(tool);
        this.tool = tool;
        this.toolDamageModifier = 1;
    }
    set damageModifier(value: number) {
        this.toolDamageModifier = 1 + value;
    }
    get damage() {
        return this.tool.Damage * this.toolDamageModifier;
    }
}

export class EnhancedSentryTool extends EnhancedDamageTool {
    public tool: SentryTool;
    private sentryCPUModifier: number;
    private shortRangeDamageModifier: number;
    constructor(tool: SentryTool) {
        super(tool);
        this.tool = tool;
        this.sentryCPUModifier = 1;
        this.shortRangeDamageModifier = 1;
    }
    set cpuModifier(value: number) {
        this.sentryCPUModifier = value;
    }
    get precision() {
        return this.tool.Damage * this.tool['Precision Multiplier'] * this.sentryDamageModifier;
    }
    get stagger() {
        return this.tool.Damage * this.tool['Stagger Multiplier'] * this.sentryDamageModifier;
    }
    get cpuSpeed() {
        return this.tool['Detection Speed'] - (this.tool['Detection Speed'] * this.sentryCPUModifier);
    }
    get biotrackSpeed() {
        return this.tool['Biotracked Speed'] - (this.tool['Biotracked Speed'] * this.sentryCPUModifier);
    }
    get shortRangeDamage() {
        return this.tool.Damage * this.shortRangeDamageModifier;
    }
    set srDamageModifier(value: number) {
        this.shortRangeDamageModifier = 1 + value;
    }
}

export class EnhancedBioTracker extends EnhancedTool {
    tool: BioTracker;
    cooldownModifier: number;
    constructor(tracker: BioTracker) {
        super(tracker);
        this.tool = tracker;
        this.cooldownModifier = 0;
    }
    set cooldown(value: number) {
        this.cooldownModifier = value;
    }
    get cooldown() {
        return this.tool.Cooldown - (this.tool.Cooldown * this.cooldownModifier);
    }
}

export class EnhancedCFoamLauncher extends EnhancedAmmoTool {
    tool: CFoamLauncher;

    constructor(launcher: CFoamLauncher) {
        super(launcher);
        this.tool = launcher;
    }
}

export class EnhancedMineDeployer extends EnhancedDamageTool {
    tool: MineDeployer;

    constructor(deployer: MineDeployer) {
        super(deployer);
        this.tool = deployer;
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
