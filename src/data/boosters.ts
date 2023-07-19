export interface Effect {
    stat: string;
    value: number;
}

export interface Booster {
    positive: Effect[],
    negative: Effect[],
    condition: Effect[],
}

const effects = [
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
            min: 0,
            max: 0,
        },
    },
    {
        stat: 'Med Efficiency',
        muted: {
            min: 0.10,
            max: 0.15,
        },
        bold: {
            min: 0,
            max: 0,
        },
        aggressive: {
            min: 0,
            max: 0,
        },
    },
    {
        stat: 'Supply Efficiency',
        muted: {
            min: 0.10,
            max: 0.15,
        },
        bold: {
            min: 0,
            max: 0,
        },
        aggressive: {
            min: 0,
            max: 0,
        },
    },
    {
        stat: 'Infection Resistance',
        muted: {
            min: 0.15,
            max: 0.25,
        },
        bold: {
            min: 0,
            max: 0,
        },
        aggressive: {
            min: 0,
            max: 0,
        },
    },
    {
        stat: 'Main Ammo',
        muted: {
            min: 0.10,
            max: 0.20,
        },
        bold: {
            min: 0,
            max: 0,
        },
        aggressive: {
            min: 0,
            max: 0,
        },
    },
    {
        stat: 'Special Ammo',
        muted: {
            min: 0.10,
            max: 0.20,
        },
        bold: {
            min: 0,
            max: 0,
        },
        aggressive: {
            min: 0,
            max: 0,
        },
    },
    {
        stat: 'Tool Ammo',
        muted: {
            min: 0.10,
            max: 0.20,
        },
        bold: {
            min: 0,
            max: 0,
        },
        aggressive: {
            min: 0,
            max: 0,
        },
    },
    {
        stat: 'Regen Cap',
        muted: {
            min: 0.15,
            max: 0.25,
        },
        bold: {
            min: 0,
            max: 0,
        },
        aggressive: {
            min: 0,
            max: 0,
        },
    },
    {
        stat: 'Melee Damage',
        muted: {
            min: 0.05,
            max: 0.15,
        },
        bold: {
            min: 0,
            max: 0,
        },
        aggressive: {
            min: 0,
            max: 0,
        },
    },
    {
        stat: 'Main Damage',
        muted: {
            min: 0.05,
            max: 0.15,
        },
        bold: {
            min: 0,
            max: 0,
        },
        aggressive: {
            min: 0,
            max: 0,
        },
    },
    {
        stat: 'Special Damage',
        muted: {
            min: 0.05,
            max: 0.15,
        },
        bold: {
            min: 0,
            max: 0,
        },
        aggressive: {
            min: 0,
            max: 0,
        },
    },
    {
        stat: 'C-Foam Portion',
        muted: {
            min: 0.15,
            max: 0.25,
        },
        bold: {
            min: 0,
            max: 0,
        },
        aggressive: {
            min: 0,
            max: 0,
        },
    },
    {
        stat: 'Sentry CPU Speed',
        muted: {
            min: 0.10,
            max: 0.15,
        },
        bold: {
            min: 0,
            max: 0,
        },
        aggressive: {
            min: 0,
            max: 0,
        },
    },
    {
        stat: 'Sentry Damage',
        muted: {
            min: 0.05,
            max: 0.10,
        },
        bold: {
            min: 0,
            max: 0,
        },
        aggressive: {
            min: 0,
            max: 0,
        },
    },
    {
        stat: 'SR Sentry Damage',
        muted: {
            min: 0.10,
            max: 0.15,
        },
        bold: {
            min: 0,
            max: 0,
        },
        aggressive: {
            min: 0,
            max: 0,
        },
    },
    {
        stat: 'Trip Mine Damage',
        muted: {
            min: 0.20,
            max: 0.30,
        },
        bold: {
            min: 0,
            max: 0,
        },
        aggressive: {
            min: 0,
            max: 0,
        },
    },
    {
        stat: 'Glow Stick Power',
        muted: {
            min: 0.20,
            max: 0.30,
        },
        bold: {
            min: 0,
            max: 0,
        },
        aggressive: {
            min: 0,
            max: 0,
        },
    },
    {
        stat: 'Fog Repeller Power',
        muted: {
            min: 0.20,
            max: 0.30,
        },
        bold: {
            min: 0,
            max: 0,
        },
        aggressive: {
            min: 0,
            max: 0,
        },
    },
    {
        stat: 'Tracker CPU Speed',
        muted: {
            min: 0.05,
            max: 0.10,
        },
        bold: {
            min: 0,
            max: 0,
        },
        aggressive: {
            min: 0,
            max: 0,
        },
    },
    {
        stat: 'Hacking Skill',
        muted: {
            min: 0.20,
            max: 0.40,
        },
        bold: {
            min: 0,
            max: 0,
        },
        aggressive: {
            min: 0,
            max: 0,
        },
    },
    {
        stat: 'Bioscan Speed',
        muted: {
            min: 0.13,
            max: 0.18,
        },
        bold: {
            min: 0,
            max: 0,
        },
        aggressive: {
            min: 0,
            max: 0,
        },
    },
]
