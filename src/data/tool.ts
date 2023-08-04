export interface SentryTool {
    [index: string]: string | number;
    Name: string;
    Type: string;
    Firemode: string;
    'Max Ammo': number;
    'Starting Ammo': number;
    'Ammo Per Refill': number;
    Damage: number;
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

export interface BioTracker {
    [index: string]: string | number;
    Name: string;
    Type: string;
    Cooldown: number;
}

export interface CFoamLauncher {
    [index: string]: string | number;
    Name: string;
    Type: string;
    'Max Ammo': number;
    'Starting Ammo': number;
    'Ammo Per Refill': number;
}

export interface MineDeployer {
    [index: string]: string | number;
    Name: string;
    Type: string;
    'Max Ammo': number;
    'Starting Ammo': number;
    'Ammo Per Refill': number;
    'Damage': number;
}

export class EnhancedSentryTool {
    [index: string]: any;
    public tool: SentryTool;
    private sentryDamageModifier: number;
    private sentryAmmoModifier: number;
    private sentryCPUModifier: number;
    private sentryRefillModifier: number;
    constructor(tool: SentryTool) {
        this.tool = tool;
        this.sentryCPUModifier = 1;
        this.sentryDamageModifier = 1;
        this.sentryAmmoModifier = 1;
        this.sentryRefillModifier = 1;
    }
    get name(): string {
        return this.tool.Name;
    }
    get type(): string {
        return this.tool.Type;
    }
    set damageModifier(value: number) {
        this.sentryDamageModifier = 1 + value;
    }
    set ammoModifier(value: number) {
        this.sentryAmmoModifier = 1 + value;
    }
    set cpuModifier(value: number) {
        this.sentryCPUModifier = value;
    }
    set refillModifier(value: number) {
        this.sentryRefillModifier = 1 + value;
    }
    get damage() {
        return this.tool.Damage * this.sentryDamageModifier;
    }
    get precision() {
        return this.tool.Damage * this.tool["Precision Multiplier"] * this.sentryDamageModifier;
    }
    get stagger() {
        return this.tool.Damage * this.tool["Stagger Multiplier"] * this.sentryDamageModifier;
    }
    get startingAmmo() {
        return this.tool["Starting Ammo"] * this.sentryAmmoModifier;
    }
    get cpuSpeed() {
        return this.tool['Detection Speed'] - (this.tool['Detection Speed'] * this.sentryCPUModifier);
    }
    get biotrackSpeed() {
        return this.tool['Biotracked Speed'] - (this.tool['Biotracked Speed'] * this.sentryCPUModifier);
    }
    get ammoPerRefill() {
        return this.tool["Ammo Per Refill"] * this.sentryRefillModifier;
    }
}

export class EnhancedTracker {
    tool: BioTracker;
    cooldownModifier: number;
    constructor(tracker: BioTracker) {
        this.tool = tracker;
        this.cooldownModifier = 0;
    }
    get name() {
        return this.tool.Name;
    }
    get type() {
        return this.tool.Type;
    }
    set cooldown(value: number) {
        this.cooldownModifier = value;
    }
    get cooldown() {
        return this.tool.Cooldown - (this.tool.Cooldown * this.cooldownModifier);
    }
}

export class EnhancedCFoamLauncher {
    tool: CFoamLauncher;
    launcherAmmoModifier: number;
    launcherRefillModifier: number;

    constructor(launcher: CFoamLauncher) {
        this.tool = launcher;
        this.launcherAmmoModifier = 1;
        this.launcherRefillModifier = 1;
    }

    set ammoModifier(value: number) {
        this.launcherAmmoModifier = 1 + value;
    }
    set refillModifier(value: number) {
        this.launcherRefillModifier = 1 + value;
    }
    get name() {
        return this.tool.Name;
    }
    get type() {
        return this.tool.Type;
    }
    get startingAmmo() {
        return this.tool["Starting Ammo"] * this.launcherAmmoModifier;
    }
    get ammoPerRefill() {
        return this.tool["Ammo Per Refill"] * this.launcherRefillModifier;
    }
}

export class EnhancedMineDeployer {
    tool: MineDeployer;
    private mineAmmoModifier: number;
    private mineRefillModifier: number;
    private mineDamageModifier: number;

    constructor(deployer: MineDeployer) {
        this.tool = deployer;
        this.mineAmmoModifier = 1;
        this.mineRefillModifier = 1;
        this.mineDamageModifier = 1;
    }
    set ammoModifier(value: number) {
        this.mineAmmoModifier = 1 + value;
    }
    set refillModifier(value: number) {
        this.mineRefillModifier = 1 + value;
    }
    set damageModifier(value: number) {
        this.mineDamageModifier = 1 + value;
    }

    get name() {
        return this.tool.Name;
    }
    get type() {
        return this.tool.Type;
    }
    get startingAmmo() {
        return this.tool["Starting Ammo"] * this.mineAmmoModifier;
    }
    get ammoPerRefill() {
        return this.tool["Ammo Per Refill"] * this.mineRefillModifier;
    }
    get damage() {
        return this.tool.Damage * this.mineDamageModifier;
    }
}

export class EnhancedTool {
    EnhancedTool: EnhancedSentryTool | EnhancedTracker | EnhancedCFoamLauncher | EnhancedMineDeployer;

    constructor(tool: EnhancedSentryTool | EnhancedTracker | EnhancedCFoamLauncher | EnhancedMineDeployer) {
        this.EnhancedTool = tool;
    }
}

import _tools from './tool.json';
const tools: SentryTool[] = _tools.sentry;

export default tools;
