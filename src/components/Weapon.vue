<template>
    <div class="container-fluid border rounded text-center p-3">
        <div class="row">
            <div class="col-4">
                <h3>{{ weapon.Type }}</h3>
                <h4>{{ weapon.Name }}</h4>
            </div>
            <div class="col-8">
                <div class="row">
                    <div class="col text-end">Damage</div>
                    <div class="col text-start">
                        <div class="progress" role="progressbar" aria-label="Segment one" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100" :style="`width: ${weapon.Damage / totalValues.Damage * 100}%`">
                            <div class="progress-bar"></div>
                        </div>
                    </div>
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
        </div>
    </div>
</template>

<script setup lang="ts">
import type { EnhancedWeapon } from '../data/weapons';

const props = defineProps<{
    weaponValues: EnhancedWeapon,
    totalValues: EnhancedWeapon,
}>();
const weapon = props.weaponValues;

const bulletsPerSecond = weapon['Rate of Fire'] / 60;
const secondsPerMag = weapon['Magazine Size'] / bulletsPerSecond;
const totalTime = secondsPerMag + weapon['Reload Time (s)'];
const effectiveDPS = weapon['Damage Per Mag'] / totalTime;

</script>

<style scoped>

</style>
