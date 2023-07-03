import { EnhancedWeapon, processWeapon } from './mainWeapons';

import _special from './special.json';
const special: EnhancedWeapon[] = [];
for (const item of _special) {
    special.push(processWeapon(item));
}

export default special;
