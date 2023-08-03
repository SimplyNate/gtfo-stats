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

export class EnhancedSentryTool {
    [index: string]: any;
    public tool: SentryTool;
    private sentryDamageModifier: number;
    private sentryAmmoModifier: number;
    private sentryCPUModifier: number;
    constructor(tool: SentryTool) {
        this.tool = tool;
        this.sentryCPUModifier = 1;
        this.sentryDamageModifier = 1;
        this.sentryAmmoModifier = 1;
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
}

export class Tool {
    tool: EnhancedSentryTool;
}

import _tools from './tool.json';
const tools: SentryTool[] = _tools.sentry;

export default tools;
