export interface SentryTool {
    [index: string]: string | number;
    Name: string;
    Type: string;
    Firemode: string;
    'Max Ammo': number;
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
    set speedModifier(value: number) {
        this.sentryCPUModifier = 1 + value;
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
}

export class Tool {
    tool: EnhancedSentryTool;
}

import _tools from './tool.json';
const tools: SentryTool[] = _tools;

export default tools;
