interface EnemyDamageType {
    Name: string;
    Type: string;
    Value: number;
}

interface EnemyWeakPoints {
    [index: string]: EnemyWeakPoint;
}

interface EnemyWeakPoint {
    Multiplier: number;
    Health?: number;
}
export interface Enemy {
    Name: string;
    Damage: EnemyDamageType[];
    Health: number;
    'Stagger HP': number;
    Speed: string;
    'Weak Points': EnemyWeakPoints;
}

import _enemies from './enemies.json';
const enemies: Enemy[] = <Enemy[]>_enemies;
export default enemies;
