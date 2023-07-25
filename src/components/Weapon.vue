<template>
    <div :id="`${weapon.Name}`" class="container-fluid border rounded text-center p-3 clickable" @click="toggleMore">
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
                            <div class="progress-bar chart-bg" name="Damage" :style="`width: ${weapon.Damage / totalValues.Damage * 100}%`">{{ weapon.Damage }}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 text-end">DPS</div>
                    <div class="col-10 text-start">
                        <div class="progress bg-dark mt-2" role="progressbar">
                            <div class="progress-bar chart-bg" name="DPS" :style="`width: ${weapon['DPS'] /  totalValues['DPS'] * 100}%`">{{ weapon['DPS'].toFixed(2) }}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 text-end">Effective DPS</div>
                    <div class="col-10 text-start">
                        <div class="progress bg-dark mt-2" role="progressbar">
                            <div class="progress-bar chart-bg" name="Effective DPS" :style="`width: ${weapon['Effective DPS'] /  totalValues['Effective DPS'] * 100}%`">{{ weapon['Effective DPS'].toFixed(2) }}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 text-end">Dmg/Mag</div>
                    <div class="col-10 text-start">
                        <div class="progress bg-dark mt-2" role="progressbar">
                            <div class="progress-bar chart-bg" name="Damage Per Mag" :style="`width: ${weapon['Damage Per Mag'] /  totalValues['Damage Per Mag'] * 100}%`">{{ weapon['Damage Per Mag'].toFixed(2) }}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 text-end">Total Damage</div>
                    <div class="col-10 text-start">
                        <div class="progress bg-dark mt-2" role="progressbar">
                            <div class="progress-bar chart-bg" name="Total Damage" :style="`width: ${weapon['Total Damage'] /  totalValues['Total Damage'] * 100}%`">{{ weapon['Total Damage'].toFixed(2) }}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 text-end">Precision</div>
                    <div class="col-10 text-start">
                        <div class="progress bg-dark mt-2" role="progressbar">
                            <div class="progress-bar chart-bg" name="Precision Damage" :style="`width: ${weapon['Precision Damage'] / totalValues['Precision Damage'] * 100}%`">{{ weapon['Precision Damage'].toFixed(2) }}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 text-end">Stagger</div>
                    <div class="col-10 text-start">
                        <div class="progress bg-dark mt-2" role="progressbar">
                            <div class="progress-bar chart-bg" name="Stagger Damage" :style="`width: ${weapon['Stagger Damage'] /  totalValues['Stagger Damage'] * 100}%`">{{ weapon['Stagger Damage'].toFixed(2) }}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 text-end">Reload Time</div>
                    <div class="col-10 text-start">
                        <div class="progress bg-dark mt-2" role="progressbar">
                            <div class="progress-bar chart-bg" name="Reload Time (s)" :style="`width: ${weapon['Reload Time (s)'] /  totalValues['Reload Time (s)'] * 100}%`">{{ weapon['Reload Time (s)'] }}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 text-end">Range</div>
                    <div class="col-10 text-start">
                        <div class="progress bg-dark mt-2" role="progressbar">
                            <div class="progress-bar chart-bg" name="Range (m)" :style="`width: ${weapon['Range (m)'] /  totalValues['Range (m)'] * 100}%`">{{ weapon['Range (m)'] }}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 text-end">Mag Size</div>
                    <div class="col-10 text-start">
                        <div class="progress bg-dark mt-2" role="progressbar">
                            <div class="progress-bar chart-bg" name="Magazine Size" :style="`width: ${weapon['Magazine Size'] /  totalValues['Magazine Size'] * 100}%`">{{ weapon['Magazine Size'] }}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 text-end">Total Ammo</div>
                    <div class="col-10 text-start">
                        <div class="progress bg-dark mt-2" role="progressbar">
                            <div class="progress-bar chart-bg" name="Max Ammo" :style="`width: ${weapon['Max Ammo'] /  totalValues['Max Ammo'] * 100}%`">{{ weapon['Max Ammo'] }}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 text-end">Rate of Fire</div>
                    <div class="col-10 text-start">
                        <div class="progress bg-dark mt-2" role="progressbar">
                            <div class="progress-bar chart-bg" name="Rate of Fire" :style="`width: ${weapon['Rate of Fire'] /  totalValues['Rate of Fire'] * 100}%`">{{ weapon['Rate of Fire'] }}</div>
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
                                    <div class="progress-bar chart-bg enemy-bar" :style="`width: ${weapon.Damage / enemy.Health * 100}%`">{{ (weapon.Damage / enemy.Health * 100).toFixed(2) }}%</div>
                                </div>
                            </div>
                            <div class="col-2">To kill: {{ Math.ceil(enemy.Health / weapon.Damage) }}</div>
                            <div class="col-2">Waste: {{ (((Math.ceil(enemy.Health / weapon.Damage) * weapon.Damage) - enemy.Health) / weapon.Damage * 100).toFixed(2) }}%</div>
                        </div>
                        <div class="row" v-for="weakPoint of Object.keys(enemy['Weak Points'])" :key="weakPoint">
                            <div class="col-2 text-end">{{ weakPoint }} %</div>
                            <div class="col-6 text-start">
                                <div class="progress bg-dark mt-2" role="progressbar">
                                    <div class="progress-bar chart-bg enemy-bar" :style="`width: ${weakPointDamage(weapon, enemy, weakPoint) / enemy.Health * 100}%`">{{ (weakPointDamage(weapon, enemy, weakPoint) / enemy.Health * 100).toFixed(2) }}%</div>
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
import { onMounted, ref } from 'vue';

const props = defineProps<{
    weaponValues: EnhancedWeapon,
    totalValues: EnhancedWeapon,
    minimumValues: EnhancedWeapon,
    mini?: boolean,
}>();
const weapon = props.weaponValues;

const showMore = ref<boolean>(false);

function toggleMore() {
    showMore.value = !showMore.value;
    setTimeout(() => {
        const progressBars = document.querySelectorAll('.enemy-bar');
        for (const elem of progressBars) {
            if (Number((<HTMLElement>elem).style.width.replace('%', '')) >= 100) {
                elem.setAttribute('class', 'progress-bar chart-bg-best');
            }
        }
    }, 1);
}

function weakPointDamage(weapon: EnhancedWeapon, enemy: Enemy, enemyWeakPoint: string) {
    return weapon['Precision Damage'] * enemy['Weak Points'][enemyWeakPoint].Multiplier;
}

onMounted(() => {
    const parent: HTMLElement = document.getElementById(props.weaponValues.Name)!;
    const progressBars = parent.querySelectorAll('.progress-bar');
    for (const elem of progressBars) {
        const name = <string>elem.getAttribute('name');
        const currentValue = Number((<HTMLElement>elem).innerHTML);
        if (Number((<HTMLElement>elem).style.width.replace('%', '')) >= 100) {
            if (name === 'Reload Time (s)') {
                elem.setAttribute('class', 'progress-bar chart-bg-danger');
            }
            else {
                elem.setAttribute('class', 'progress-bar chart-bg-best');
            }
        }
        else if (currentValue.toFixed(2) === (<number>props.minimumValues[name]).toFixed(2)) {
            if (name === 'Reload Time (s)') {
                elem.setAttribute('class', 'progress-bar chart-bg-best');
            }
            else {
                elem.setAttribute('class', 'progress-bar chart-bg-danger');
            }
        }
    }
});

</script>

<style scoped>
.chart-bg-best {
    background-color: #257a1b;
}
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
