interface EnemyDamageType {
    Name: string;
    Type: string;
    Value: number;
}

interface EnemyWeakPoint {
    Area: string;
    Multiplier: number;
    Health?: number;
}
interface Enemy {
    Name: string;
    Damage: EnemyDamageType[];
    Health: number;
    'Stagger HP': number;
    Speed: string;
    'Weak Points': EnemyWeakPoint[];
}

import _enemies from './enemies.json';
const enemies: Enemy[] = _enemies;
export default enemies;
