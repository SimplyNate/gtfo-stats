<template>
    <div class="container-fluid border rounded text-center p-3">
        <div class="row">
            <div class="col">
                <h3>{{ weapon.Type }}</h3>
                <h4>{{ weapon.Name }}</h4>
            </div>
            <div class="col">
                <div class="row">
                    <div class="col text-end">Damage</div>
                    <div class="col text-start">{{ weapon.Damage }}</div>
                </div>
                <div class="row">
                    <div class="col text-end">Precision</div>
                    <div class="col text-start">{{ (weapon["Precision Damage"]).toFixed(2) }}</div>
                </div>
                <div class="row">
                    <div class="col text-end">Stagger</div>
                    <div class="col text-start">{{ (weapon["Stagger Multiplier"] * weapon.Damage).toFixed(2) }}</div>
                </div>
                <div class="row">
                    <div class="col text-end">Headshot</div>
                    <div class="col text-start">{{ (weapon['Headshot Damage']).toFixed(2) }}</div>
                </div>
                <div class="row">
                    <div class="col text-end">Reload Time</div>
                    <div class="col text-start">{{ weapon['Reload Time (s)'] }} seconds</div>
                </div>
                <div class="row">
                    <div class="col text-end">Range</div>
                    <div class="col text-start">{{ weapon['Range (m)'] }} meters</div>
                </div>
                <div class="row">
                    <div class="col text-end">Mag Size</div>
                    <div class="col text-start">{{ weapon['Magazine Size'] }}</div>
                </div>
                <div class="row">
                    <div class="col text-end">Rate of Fire</div>
                    <div class="col text-start">{{ weapon['Rate of Fire'] }}</div>
                </div>
            </div>
            <div class="col">
                <div class="row">
                    <div class="col text-end">DPS</div>
                    <div class="col text-start">{{ Math.round(weapon.Damage * weapon['Rate of Fire'] / 60) }}</div>
                </div>
                <div class="row">
                    <div class="col text-end">Effective DPS</div>
                    <div class="col text-start">{{ effectiveDPS.toFixed(2) }}</div>
                </div>
                <div class="row">
                    <div class="col text-end">Dmg/Mag</div>
                    <div class="col text-start">{{ Math.round(weapon.Damage * weapon['Magazine Size']) }}</div>
                </div>
                <div class="row">
                    <div class="col text-end">Total Damage</div>
                    <div class="col text-start">{{ Math.round(weapon.Damage * weapon['Max Ammo']) }}</div>
                </div>
            </div>
            <div class="col">
                <div class="fw-bold">Max shots to kill:</div>
                <div class="row">
                    <div>Striker: {{ Math.ceil(striker.Health / weapon.Damage) }}</div>
                </div>
                <div class="row">
                    <div>Shooter: {{ Math.ceil(shooter.Health / weapon.Damage) }}</div>
                </div>
                <div class="row">
                    <div>Giant: {{ Math.ceil(gStriker.Health / weapon.Damage) }}</div>
                </div>
                <div class="row">
                    <div>Giant Shooter: {{ Math.ceil(gShooter.Health / weapon.Damage) }}</div>
                </div>
            </div>
            <div class="col">
                <div class="fw-bold">% Health per Shot</div>
                <div class="row">
                    <div>Scout: {{ (weapon.Damage * weapon["Precision Multiplier"] * scout["Weak Points"].Head.Multiplier / scout.Health).toFixed(2) }}</div>
                    <div>Charger: {{ (weapon.Damage / charger.Health).toFixed(2) }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Weapon } from '../data/weapons';
import enemies from '../data/enemies';
import type { Enemy } from '../data/enemies';

const props = defineProps({
    weaponValues: Object,
});
const weapon: Weapon = <Weapon>props.weaponValues;

const bulletsPerSecond = weapon['Rate of Fire'] / 60;
const secondsPerMag = weapon['Magazine Size'] / bulletsPerSecond;
const totalTime = secondsPerMag + weapon['Reload Time (s)'];
const effectiveDPS = weapon['Damage Per Mag'] / totalTime;

const striker = <Enemy>enemies.find(e => e.Name === 'Striker');
const shooter = <Enemy>enemies.find(e => e.Name === 'Shooter');
const gStriker = <Enemy>enemies.find(e => e.Name === 'Giant');
const gShooter = <Enemy>enemies.find(e => e.Name === 'Giant Shooter');
const scout = <Enemy>enemies.find(e => e.Name === 'Scout');
const charger = <Enemy>enemies.find(e => e.Name === 'Charger');

</script>

<style scoped>

</style>
