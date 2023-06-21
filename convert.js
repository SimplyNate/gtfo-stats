import { parse } from 'csv-parse/sync';
import fs from 'node:fs';

const enemies = fs.readFileSync('./src/data/enemies.csv');
const main = fs.readFileSync('./src/data/main.csv');
const special = fs.readFileSync('./src/data/special.csv');

const enemyRecords = parse(enemies, { columns: true, skip_empty_lines: true });
const mainRecords = parse(main, { columns: true, skip_empty_lines: true });
const specialRecords = parse(special, { columns: true, skip_empty_lines: true });

fs.writeFileSync('enemies.json', JSON.stringify(enemyRecords));
fs.writeFileSync('main.json', JSON.stringify(mainRecords));
fs.writeFileSync('special.json', JSON.stringify(specialRecords));
