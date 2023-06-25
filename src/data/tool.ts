interface SentryTool {
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

import _tools from './tool.json';
const tools: SentryTool[] = _tools;

export default tools;
