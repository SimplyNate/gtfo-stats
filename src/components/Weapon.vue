<template>
    <div class="container-fluid border rounded text-center p-3">
        <div class="row">
            <div class="col-4">
                <h3>{{ weapon.Type }}</h3>
                <h4>{{ weapon.Name }}</h4>
            </div>
            <div class="col-8">
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

</script>

<style scoped>
.chart-bg {
    background-color: #1b537a;
}
.chart-bg-danger {
    background-color: #7C2D3E;
}
</style>
