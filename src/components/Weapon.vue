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
                    <!--
                     Rounds per second: weapon['Rate of Fire'] / 60    | 60 / 60 = 1
                     Seconds per mag: weapon['Magazine Size'] * rps    | 10 * 1 = 10
                     Turn around time: spm + reload time               | 10 + 5 = 15 - take the ratio of these two times
                     Damage per mag / turn around time?

                     Turn arounds per minute: 60 / 15 = 4

                     -->
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

const props = defineProps({
    weaponValues: Object,
});
const weapon: Weapon = <Weapon>props.weaponValues;

const bulletsPerSecond = weapon["Rate of Fire"] / 60;
const secondsPerMag = weapon["Magazine Size"] / bulletsPerSecond;
const totalTime = secondsPerMag + weapon["Reload Time (s)"];
const effectiveDPS = weapon["Damage Per Mag"] / totalTime;
console.log(weapon.Type, bulletsPerSecond, secondsPerMag, totalTime, effectiveDPS);

const striker = enemies.find(e => e.Name === 'Striker');
const shooter = enemies.find(e => e.Name === 'Shooter');
const gStriker = enemies.find(e => e.Name === 'Giant');
const gShooter = enemies.find(e => e.Name === 'Giant Shooter');
const scout = enemies.find(e => e.Name === 'Scout');
const charger = enemies.find(e => e.Name === 'Charger');

</script>

<style scoped>

</style>
