import { EnhancedWeapon, calculateDPS, calculateEffectiveDPS } from './mainWeapons';

import _special from './special.json';
const special: EnhancedWeapon[] = [];
for (const item of _special) {
    special.push({
        ...item,
        DPS: calculateDPS(item),
        'Effective DPS': calculateEffectiveDPS(item),
    })
}

export default special;
