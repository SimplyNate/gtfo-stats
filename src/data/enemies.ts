interface EnemyDamageType {
    Name: string;
    Type: string;
    Value: number;
}

interface EnemyWeakPoints {
    Head?: EnemyWeakPoint;
    Back?: EnemyWeakPoint;
    Occipital?: EnemyWeakPoint;
    Tumors?: EnemyWeakPoint;
}

interface EnemyWeakPoint {
    Multiplier: number;
    Health?: number;
}
interface Enemy {
    Name: string;
    Damage: EnemyDamageType[];
    Health: number;
    'Stagger HP': number;
    Speed: string;
    'Weak Points': EnemyWeakPoints;
}

import _enemies from './enemies.json';
const enemies: Enemy[] = _enemies;
export default enemies;
