export interface Effect {
    stat: string;
    value: number;
}

export interface Booster {
    positive: Effect[],
    negative: Effect[],
    condition: Condition[],
}

export interface EffectRange {
    min: number;
    max: number;
}

export interface EffectData {
    [index: string]: string | EffectRange;
    stat: string;
    muted: EffectRange,
    bold: EffectRange,
    aggressive: EffectRange,
}

export const effectData: EffectData[] = [
    {
        stat: 'Regen Speed',
        muted: {
            min: 0.15,
            max: 0.25,
        },
        bold: {
            min: 0.60,
            max: 1,
        },
        aggressive: {
            min: 1.20,
            max: 1.50,
        },
    },
    {
        stat: 'Melee Resistance',
        muted: {
            min: 0.05,
            max: 0.15,
        },
        bold: {
            min: 0.10,
            max: 0.20,
        },
        aggressive: {
            min: 0.20,
            max: 0.40,
        },
    },
    {
        stat: 'Projectile Resistance',
        muted: {
            min: 0.05,
            max: 0.15,
        },
        bold: {
            min: 0.10,
            max: 0.20,
        },
        aggressive: {
            min: 0.20,
            max: 0.40,
        },
    },
    {
        stat: 'Revive Speed',
        muted: {
            min: 0.10,
            max: 0.13,
        },
        bold: {
            min: 0.20,
            max: 0.30,
        },
        aggressive: {
            min: 0.80,
            max: 1,
        },
    },
    {
        stat: 'Med Efficiency',
        muted: {
            min: 0.10,
            max: 0.15,
        },
        bold: {
            min: 0.20,
            max: 0.30,
        },
        aggressive: {
            min: 0.40,
            max: 0.50,
        },
    },
    {
        stat: 'Supply Efficiency',
        muted: {
            min: 0.10,
            max: 0.15,
        },
        bold: {
            min: 0.20,
            max: 0.30,
        },
        aggressive: {
            min: 0.40,
            max: 0.50,
        },
    },
    {
        stat: 'Infection Resistance',
        muted: {
            min: 0.15,
            max: 0.25,
        },
        bold: {
            min: 0.40,
            max: 0.60,
        },
        aggressive: {
            min: 0.80,
            max: 1,
        },
    },
    {
        stat: 'Main Ammo',
        muted: {
            min: 0.10,
            max: 0.20,
        },
        bold: {
            min: 0.25,
            max: 0.35,
        },
        aggressive: {
            min: 0.40,
            max: 0.53,
        },
    },
    {
        stat: 'Special Ammo',
        muted: {
            min: 0.10,
            max: 0.20,
        },
        bold: {
            min: 0.25,
            max: 0.35,
        },
        aggressive: {
            min: 0.40,
            max: 0.53,
        },
    },
    {
        stat: 'Tool Ammo',
        muted: {
            min: 0.10,
            max: 0.20,
        },
        bold: {
            min: 0.25,
            max: 0.35,
        },
        aggressive: {
            min: 0.40,
            max: 0.53,
        },
    },
    {
        stat: 'Regen Cap',
        muted: {
            min: 0.15,
            max: 0.25,
        },
        bold: {
            min: 0.40,
            max: 0.60,
        },
        aggressive: {
            min: 0.80,
            max: 1,
        },
    },
    {
        stat: 'Melee Damage',
        muted: {
            min: 0.05,
            max: 0.15,
        },
        bold: {
            min: 0.20,
            max: 0.30,
        },
        aggressive: {
            min: 0.50,
            max: 0.60,
        },
    },
    {
        stat: 'Main Damage',
        muted: {
            min: 0.05,
            max: 0.15,
        },
        bold: {
            min: 0.15,
            max: 0.20,
        },
        aggressive: {
            min: 0.25,
            max: 0.30,
        },
    },
    {
        stat: 'Special Damage',
        muted: {
            min: 0.05,
            max: 0.15,
        },
        bold: {
            min: 0.15,
            max: 0.20,
        },
        aggressive: {
            min: 0.25,
            max: 0.30,
        },
    },
    {
        stat: 'C-Foam Portion',
        muted: {
            min: 0.15,
            max: 0.25,
        },
        bold: {
            min: 0.40,
            max: 0.60,
        },
        aggressive: {
            min: 0.80,
            max: 1,
        },
    },
    {
        stat: 'Sentry CPU Speed',
        muted: {
            min: 0.10,
            max: 0.15,
        },
        bold: {
            min: 0.20,
            max: 0.25,
        },
        aggressive: {
            min: 0.30,
            max: 0.40,
        },
    },
    {
        stat: 'Sentry Damage',
        muted: {
            min: 0.05,
            max: 0.10,
        },
        bold: {
            min: 0.15,
            max: 0.20,
        },
        aggressive: {
            min: 0.25,
            max: 0.30,
        },
    },
    {
        stat: 'SR Sentry Damage',
        muted: {
            min: 0.10,
            max: 0.15,
        },
        bold: {
            min: 0.20,
            max: 0.30,
        },
        aggressive: {
            min: 0.35,
            max: 0.40,
        },
    },
    {
        stat: 'Trip Mine Damage',
        muted: {
            min: 0.20,
            max: 0.30,
        },
        bold: {
            min: 0.45,
            max: 0.55,
        },
        aggressive: {
            min: 0.70,
            max: 1,
        },
    },
    {
        stat: 'Glow Stick Power',
        muted: {
            min: 0.20,
            max: 0.30,
        },
        bold: {
            min: 0.30,
            max: 0.40,
        },
        aggressive: {
            min: 0.35,
            max: 0.40,
        },
    },
    {
        stat: 'Fog Repeller Power',
        muted: {
            min: 0.20,
            max: 0.30,
        },
        bold: {
            min: 0.20,
            max: 0.30,
        },
        aggressive: {
            min: 0.35,
            max: 0.40,
        },
    },
    {
        stat: 'Tracker CPU Speed',
        muted: {
            min: 0.05,
            max: 0.10,
        },
        bold: {
            min: 0.12,
            max: 0.18,
        },
        aggressive: {
            min: 0.20,
            max: 0.30,
        },
    },
    {
        stat: 'Hacking Skill',
        muted: {
            min: 0.20,
            max: 0.40,
        },
        bold: {
            min: 0.60,
            max: 1,
        },
        aggressive: {
            min: 1,
            max: 1.20,
        },
    },
    {
        stat: 'Bioscan Speed',
        muted: {
            min: 0.13,
            max: 0.18,
        },
        bold: {
            min: 0.13,
            max: 0.18,
        },
        aggressive: {
            min: 0.20,
            max: 0.25,
        },
    },
]

export interface NegativeEffect {
    [index: string]: string | EffectRange | undefined;
    stat: string;
    muted?: EffectRange,
    bold?: EffectRange,
    aggressive?: EffectRange,
}

export const negativeData: NegativeEffect[] = [
    {
        stat: 'Regen Speed',
        bold: {
            min: -0.20,
            max: -0.13,
        },
    },
    {
        stat: 'Hacking Skill',
        bold: {
            min: -0.29,
            max: -0.17,
        },
        aggressive: {
            min: -0.44,
            max: -0.05,
        },
    },
    {
        stat: 'Bioscan Speed',
        aggressive: {
            min: -0.10,
            max: -0.05,
        },
    },
    {
        stat: 'Melee Damage',
        aggressive: {
            min: -0.23,
            max: -0.05,
        },
    },
    {
        stat: 'Projectile Resistance',
        aggressive: {
            min: -0.20,
            max: -0.10,
        },
    },
    {
        stat: 'Infection Resistance',
        aggressive: {
            min: -0.38,
            max: -0.10,
        },
    }
];

export interface Condition {
    name: string;
    description: string;
}

export const conditions = [
    {
        name: 'Human Proximity',
        description: 'Subject must be within 7 meters of another human',
    },
    {
        name: 'Health > 50%',
        description: 'Subject must have 50% health or more',
    },
    {
        name: 'Is Close To Enemy',
        description: 'Subject must be within 5 meters of an enemy',
    },
    {
        name: 'Enemy Distance',
        description: 'Subject must be at least 20 meters away from an enemy',
    },
    {
        name: 'In Bioscan',
        description: 'Subject must be in Bioscan for booster to be active',
    }
];
