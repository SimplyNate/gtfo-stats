import fs from 'fs';

const file = fs.readFileSync('./data/enemies.json');

const enemies = JSON.parse(file);
for (const enemy of enemies) {
    const weakPoints = enemy['Weak Points'];
    const newWeakPoints = {};
    for (const weakPoint of weakPoints) {
        newWeakPoints[weakPoint.Area] = { ...weakPoint };
        delete newWeakPoints[weakPoint.Area].Area
    }
    enemy['Weak Points'] = newWeakPoints;
}
fs.writeFileSync('./enemies.json', JSON.stringify(enemies));
