<template>
    <div class="container-fluid border rounded text-center p-3">
        <div class="row">
            <div class="col">
                <h3>{{ weapon.Type }}</h3>
                <h4>{{ weapon.Name }}</h4>
            </div>
            <div class="col">
                <div class="row">
                    <div>Damage: {{ weapon.Damage }}</div>
                </div>
                <div class="row">
                    <div>Precision: {{ weapon["Precision Damage"] }}</div>
                </div>
                <div class="row">
                    <div>Stagger: {{ weapon["Stagger Multiplier"] * weapon.Damage }}</div>
                </div>
                <div class="row">
                    <div>Headshot: {{ (weapon['Headshot Damage']).toFixed(2) }}</div>
                </div>
                <div class="row">
                    <div>Reload Time: {{ weapon['Reload Time (s)'] }}s</div>
                </div>
                <div class="row">
                    <div>Range: {{ weapon['Range (m)']}}m</div>
                </div>
                <div class="row">
                    <div>Mag Size: {{ weapon['Magazine Size'] }}</div>
                </div>
                <div class="row">
                    <div>RoF: {{ weapon['Rate of Fire'] }}r/m</div>
                </div>
            </div>
            <div class="col">
                <div class="row">
                    <div>DPS: {{ Math.round(weapon.Damage * weapon['Rate of Fire'] / 60) }}</div>
                    <div>DPS over time: {{ effectiveDPS.toFixed(2) }}</div>
                </div>
                <div class="row">
                    <div>Damage Per Mag: {{ Math.round(weapon.Damage * weapon['Magazine Size']) }}</div>
                </div>
                <div class="row">
                    <div>Total Damage: {{ Math.round(weapon.Damage * weapon['Max Ammo']) }}</div>
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
import type { Weapon } from '../data/mainWeapons';
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
console.log(weapon.Type, bulletsPerSecond, secondsPerMag, totalTime, effectiveDPS);

const striker = <Enemy>enemies.find(e => e.Name === 'Striker');
const shooter = <Enemy>enemies.find(e => e.Name === 'Shooter');
const gStriker = <Enemy>enemies.find(e => e.Name === 'Giant');
const gShooter = <Enemy>enemies.find(e => e.Name === 'Giant Shooter');
const scout = <Enemy>enemies.find(e => e.Name === 'Scout');
const charger = <Enemy>enemies.find(e => e.Name === 'Charger');

</script>

<style scoped>

</style>
