<template>
    <div class="container-fluid border rounded text-center p-3 clickable" @click="toggleMore">
        <div class="row">
            <div class="col-3">
                <h3>{{ weapon.Type }}</h3>
                <h4>{{ weapon.Name }}</h4>
            </div>
            <div class="col-9">
                <div class="row">
                    <div class="col-2 text-end">Damage</div>
                    <div class="col-10 text-start">
                        <div class="progress bg-dark mt-2" role="progressbar">
                            <div class="progress-bar chart-bg" :style="`width: ${weapon.Damage / totalValues.Damage * 100}%`">{{ weapon.Damage }}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 text-end">DPS</div>
                    <div class="col-10 text-start">
                        <div class="progress bg-dark mt-2" role="progressbar">
                            <div class="progress-bar chart-bg" :style="`width: ${weapon['DPS'] /  totalValues['DPS'] * 100}%`">{{ weapon['DPS'].toFixed(2) }}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 text-end">Effective DPS</div>
                    <div class="col-10 text-start">
                        <div class="progress bg-dark mt-2" role="progressbar">
                            <div class="progress-bar chart-bg" :style="`width: ${weapon['Effective DPS'] /  totalValues['Effective DPS'] * 100}%`">{{ weapon['Effective DPS'].toFixed(2) }}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 text-end">Dmg/Mag</div>
                    <div class="col-10 text-start">
                        <div class="progress bg-dark mt-2" role="progressbar">
                            <div class="progress-bar chart-bg" :style="`width: ${weapon['Damage Per Mag'] /  totalValues['Damage Per Mag'] * 100}%`">{{ weapon['Damage Per Mag'].toFixed(2) }}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 text-end">Total Damage</div>
                    <div class="col-10 text-start">
                        <div class="progress bg-dark mt-2" role="progressbar">
                            <div class="progress-bar chart-bg" :style="`width: ${weapon['Total Damage'] /  totalValues['Total Damage'] * 100}%`">{{ weapon['Total Damage'].toFixed(2) }}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 text-end">Precision</div>
                    <div class="col-10 text-start">
                        <div class="progress bg-dark mt-2" role="progressbar">
                            <div class="progress-bar chart-bg" :style="`width: ${weapon['Precision Damage'] / totalValues['Precision Damage'] * 100}%`">{{ weapon['Precision Damage'].toFixed(2) }}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 text-end">Stagger</div>
                    <div class="col-10 text-start">
                        <div class="progress bg-dark mt-2" role="progressbar">
                            <div class="progress-bar chart-bg" :style="`width: ${weapon['Stagger Damage'] /  totalValues['Stagger Damage'] * 100}%`">{{ weapon['Stagger Damage'].toFixed(2) }}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 text-end">Reload Time</div>
                    <div class="col-10 text-start">
                        <div class="progress bg-dark mt-2" role="progressbar">
                            <div class="progress-bar chart-bg-danger" :style="`width: ${weapon['Reload Time (s)'] /  totalValues['Reload Time (s)'] * 100}%`">{{ weapon['Reload Time (s)'] }}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 text-end">Range</div>
                    <div class="col-10 text-start">
                        <div class="progress bg-dark mt-2" role="progressbar">
                            <div class="progress-bar chart-bg" :style="`width: ${weapon['Range (m)'] /  totalValues['Range (m)'] * 100}%`">{{ weapon['Range (m)'] }}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 text-end">Mag Size</div>
                    <div class="col-10 text-start">
                        <div class="progress bg-dark mt-2" role="progressbar">
                            <div class="progress-bar chart-bg" :style="`width: ${weapon['Magazine Size'] /  totalValues['Magazine Size'] * 100}%`">{{ weapon['Magazine Size'] }}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 text-end">Total Ammo</div>
                    <div class="col-10 text-start">
                        <div class="progress bg-dark mt-2" role="progressbar">
                            <div class="progress-bar chart-bg" :style="`width: ${weapon['Max Ammo'] /  totalValues['Max Ammo'] * 100}%`">{{ weapon['Max Ammo'] }}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 text-end">Rate of Fire</div>
                    <div class="col-10 text-start">
                        <div class="progress bg-dark mt-2" role="progressbar">
                            <div class="progress-bar chart-bg" :style="`width: ${weapon['Rate of Fire'] /  totalValues['Rate of Fire'] * 100}%`">{{ weapon['Rate of Fire'] }}</div>
                        </div>
                    </div>
                </div>
                <template v-if="showMore">
                    <div class="row mt-3" v-for="enemy of enemies" :key="enemy.Name">
                        <div class="fw-bold">{{ enemy.Name }}</div>
                        <div class="row">
                            <div class="col-2 text-end">Body %</div>
                            <div class="col-6 text-start">
                                <div class="progress bg-dark mt-2" role="progressbar">
                                    <div class="progress-bar chart-bg" :style="`width: ${weapon.Damage / enemy.Health * 100}%`">{{ (weapon.Damage / enemy.Health * 100).toFixed(2) }}%</div>
                                </div>
                            </div>
                            <div class="col-2">To kill: {{ Math.ceil(enemy.Health / weapon.Damage) }}</div>
                            <div class="col-2">Waste: {{ (((Math.ceil(enemy.Health / weapon.Damage) * weapon.Damage) - enemy.Health) / weapon.Damage * 100).toFixed(2) }}%</div>
                        </div>
                        <div class="row" v-for="weakPoint of Object.keys(enemy['Weak Points'])" :key="weakPoint">
                            <div class="col-2 text-end">{{ weakPoint }} %</div>
                            <div class="col-6 text-start">
                                <div class="progress bg-dark mt-2" role="progressbar">
                                    <div class="progress-bar chart-bg" :style="`width: ${weakPointDamage(weapon, enemy, weakPoint) / enemy.Health * 100}%`">{{ (weakPointDamage(weapon, enemy, weakPoint) / enemy.Health * 100).toFixed(2) }}%</div>
                                </div>
                            </div>
                            <div class="col-2">To kill: {{ Math.ceil(enemy.Health / weakPointDamage(weapon, enemy, weakPoint)) }}</div>
                            <div class="col-2">Waste: {{ (((Math.ceil(enemy.Health / weakPointDamage(weapon, enemy, weakPoint)) * weakPointDamage(weapon, enemy, weakPoint)) - enemy.Health) / weakPointDamage(weapon, enemy, weakPoint) * 100).toFixed(2) }}%</div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { EnhancedWeapon } from '../data/weapons';
import enemies, { Enemy } from '../data/enemies';
import { ref } from 'vue';

const props = defineProps<{
    weaponValues: EnhancedWeapon,
    totalValues: EnhancedWeapon,
}>();
const weapon = props.weaponValues;

const showMore = ref<boolean>(false);

function toggleMore() {
    showMore.value = !showMore.value;
}

function weakPointDamage(weapon: EnhancedWeapon, enemy: Enemy, enemyWeakPoint: string) {
    return weapon['Precision Damage'] * enemy['Weak Points'][enemyWeakPoint].Multiplier;
}

</script>

<style scoped>
.chart-bg {
    background-color: #1b537a;
}
.chart-bg-danger {
    background-color: #7C2D3E;
}
.clickable:hover {
    cursor: pointer;
}
</style>
