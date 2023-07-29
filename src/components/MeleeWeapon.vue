<script setup lang="ts">
import { meleeMaximums, EnhancedMeleeWeapon } from '../data/melee';
import enemies, { Enemy } from '../data/enemies';
import { ref, onMounted } from 'vue';

const props = defineProps<{
    meleeWeapon: EnhancedMeleeWeapon;
}>();

const melee = props.meleeWeapon;

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

function weakPointDamage(weapon: EnhancedMeleeWeapon, enemy: Enemy, enemyWeakPoint: string) {
    return weapon.precision.Charged * enemy['Weak Points'][enemyWeakPoint].Multiplier;
}

function weakPointStealth(weapon: EnhancedMeleeWeapon, enemy: Enemy, enemyWeakPoint: string) {
    return weapon.stealthPrecision.Charged * enemy['Weak Points'][enemyWeakPoint].Multiplier;
}

onMounted(() => {
    const progressBars = document.querySelectorAll('.progress-bar');
    for (const elem of progressBars) {
        const name = <string>elem.getAttribute('name');
        const value = Number((<HTMLElement>elem).style.width.replace('%', ''));
        if (value >= 100) {
            if (name !== 'Charge Time') {
                elem.setAttribute('class', 'progress-bar chart-bg-best');
            }
        }
        else if (name === 'Charge Time' && elem.innerHTML === '0.5') {
            elem.setAttribute('class', 'progress-bar chart-bg-best');
        }
    }
});

</script>

<template>
    <div class="container-fluid border rounded text-center p-3 clickable" @click="toggleMore">
        <div class="row">
            <div class="col-3">
                <h3>{{ melee.Type }}</h3>
                <h4>{{ melee.Name }}</h4>
            </div>
            <div class="col-9">
                <div class="row">
                    <div class="col-2 text-end">Uncharged Damage</div>
                    <div class="col-10 text-start">
                        <div class="progress bg-dark mt-2" role="progressbar">
                            <div class="progress-bar chart-bg" name="Damage" :style="`width: ${melee.damage.Uncharged / meleeMaximums.Damage.Uncharged * 100}%`">{{ melee.damage.Uncharged }}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 text-end">Charged Damage</div>
                    <div class="col-10 text-start">
                        <div class="progress bg-dark mt-2" role="progressbar">
                            <div class="progress-bar chart-bg" name="Damage" :style="`width: ${melee.damage.Charged / meleeMaximums.Damage.Charged * 100}%`">{{ melee.damage.Charged }}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 text-end">Charged Precision</div>
                    <div class="col-10 text-start">
                        <div class="progress bg-dark mt-2" role="progressbar">
                            <div class="progress-bar chart-bg" name="Precision Damage" :style="`width: ${melee.precision.Charged / meleeMaximums['Precision Damage'].Charged * 100}%`">{{ (melee.precision.Charged).toFixed(2) }}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 text-end">Charged Stagger</div>
                    <div class="col-10 text-start">
                        <div class="progress bg-dark mt-2" role="progressbar">
                            <div class="progress-bar chart-bg" name="Stagger Damage" :style="`width: ${melee.stagger.Charged / meleeMaximums['Stagger Damage'].Charged * 100}%`">{{ (melee.stagger.Charged).toFixed(2) }}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 text-end">Range</div>
                    <div class="col-10 text-start">
                        <div class="progress bg-dark mt-2" role="progressbar">
                            <div class="progress-bar chart-bg" name="Range" :style="`width: ${melee.weapon.Range / meleeMaximums.Range * 100}%`">{{ melee.weapon.Range }}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 text-end">Charge Time</div>
                    <div class="col-10 text-start">
                        <div class="progress bg-dark mt-2" role="progressbar">
                            <div class="progress-bar chart-bg" name="Charge Time" :style="`width: ${melee.weapon['Charge Time'] / meleeMaximums['Charge Time'] * 100}%`">{{ melee.weapon['Charge Time'] }}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 text-end">Charge Hold</div>
                    <div class="col-10 text-start">
                        <div class="progress bg-dark mt-2" role="progressbar">
                            <div class="progress-bar chart-bg" name="Charge Hold Duration" :style="`width: ${melee.weapon['Charge Hold Duration'] / meleeMaximums['Charge Hold Duration'] * 100}%`">{{ melee.weapon['Charge Hold Duration'] }}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 text-end">Charged DPS</div>
                    <div class="col-10 text-start">
                        <div class="progress bg-dark mt-2" role="progressbar">
                            <div class="progress-bar chart-bg" name="DPS" :style="`width: ${melee.dps.Charged / meleeMaximums.DPS * 100}%`">{{ (melee.dps.Charged).toFixed(2) }}</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 text-end">Stagger DPS</div>
                    <div class="col-10 text-start">
                        <div class="progress bg-dark mt-2" role="progressbar">
                            <div class="progress-bar chart-bg" name="Stagger DPS" :style="`width: ${melee.staggerDPS.Charged / meleeMaximums['Stagger DPS'] * 100}%`">{{ (melee.staggerDPS.Charged).toFixed(2) }}</div>
                        </div>
                    </div>
                </div>
                <template v-if="showMore">
                    <div class="row mt-3" v-for="enemy of enemies" :key="enemy.Name">
                        <div class="row" v-if="melee.Type === 'Knife'">
                            <div class="fw-bold">{{ enemy.Name }} - Stealth</div>
                            <div class="row">
                                <div class="col-2 text-end">Body %</div>
                                <div class="col-8 text-start">
                                    <div class="progress bg-dark mt-2" role="progressbar">
                                        <div class="progress-bar chart-bg enemy-bar" :style="`width: ${melee.stealthNormal.Charged / enemy.Health * 100}%`">{{ (melee.stealthNormal.Charged / enemy.Health * 100).toFixed(2) }}%</div>
                                    </div>
                                </div>
                                <div class="col-2">To kill: {{ Math.ceil(enemy.Health / (melee.stealthNormal.Charged)) }}</div>
                            </div>
                            <div class="row" v-for="weakPoint of Object.keys(enemy['Weak Points'])" :key="weakPoint">
                                <div class="col-2 text-end">{{ weakPoint }} %</div>
                                <div class="col-8 text-start">
                                    <div class="progress bg-dark mt-2" role="progressbar">
                                        <div class="progress-bar chart-bg enemy-bar" :style="`width: ${weakPointStealth(melee, enemy, weakPoint) / enemy.Health * 100}%`">{{ (weakPointStealth(melee, enemy, weakPoint) / enemy.Health * 100).toFixed(2) }}%</div>
                                    </div>
                                </div>
                                <div class="col-2">To kill: {{ Math.ceil(enemy.Health / weakPointStealth(melee, enemy, weakPoint)) }}</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="fw-bold">{{ enemy.Name }}<span v-if="melee.Type === 'Knife'"> - Loud</span></div>
                            <div class="row">
                                <div class="col-2 text-end">Body %</div>
                                <div class="col-8 text-start">
                                    <div class="progress bg-dark mt-2" role="progressbar">
                                        <div class="progress-bar chart-bg enemy-bar" :style="`width: ${melee.damage.Charged / enemy.Health * 100}%`">{{ (melee.damage.Charged / enemy.Health * 100).toFixed(2) }}%</div>
                                    </div>
                                </div>
                                <div class="col-2">To kill: {{ Math.ceil(enemy.Health / melee.damage.Charged) }}</div>
                            </div>
                            <div class="row" v-for="weakPoint of Object.keys(enemy['Weak Points'])" :key="weakPoint">
                                <div class="col-2 text-end">{{ weakPoint }} %</div>
                                <div class="col-8 text-start">
                                    <div class="progress bg-dark mt-2" role="progressbar">
                                        <div class="progress-bar chart-bg enemy-bar" :style="`width: ${weakPointDamage(melee, enemy, weakPoint) / enemy.Health * 100}%`">{{ (weakPointDamage(melee, enemy, weakPoint) / enemy.Health * 100).toFixed(2) }}%</div>
                                    </div>
                                </div>
                                <div class="col-2">To kill: {{ Math.ceil(enemy.Health / weakPointDamage(melee, enemy, weakPoint)) }}</div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
