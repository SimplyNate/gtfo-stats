<script setup lang="ts">
import { EnhancedMeleeWeapon } from '../data/melee';
import enemies, { Enemy } from '../data/enemies';
import { ref, computed } from 'vue';
import Stat from "./Stat.vue";

const props = defineProps<{
    weapon: EnhancedMeleeWeapon;
    maximums: any;
    damageBoost: number;
}>();

const effectedWeapon = computed(() => {
    const newWeapon = new EnhancedMeleeWeapon(props.weapon.weapon);
    newWeapon.modifier = props.damageBoost;
    return newWeapon;
});

const displayKeys: {[index: string]: string} = {
    damage: 'Damage',
    precision: 'Precision Damage',
    stagger: 'Stagger Damage',
};

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

</script>

<template>
    <div class="clickable" @click="toggleMore">
        <h5 class="mt-3 fw-bold">{{ weapon.Type }}</h5>
        <stat v-for="key of Object.keys(displayKeys)" :key="key"
              :title="`${displayKeys[key]} - Uncharged`"
              :original-value="weapon[key].Uncharged"
              :new-value="effectedWeapon[key].Uncharged"
              :max-value="maximums[displayKeys[key]].Uncharged"/>
        <stat v-for="key of Object.keys(displayKeys)" :key="key"
              :title="`${displayKeys[key]} - Charged`"
              :original-value="weapon[key].Charged"
              :new-value="effectedWeapon[key].Charged"
              :max-value="maximums[displayKeys[key]].Charged"/>
        <template v-if="showMore">
            <div class="row mt-3" v-for="enemy of enemies" :key="enemy.Name">
                <div class="row" v-if="weapon.Type === 'Knife'">
                    <div class="fw-bold">{{ enemy.Name }} - Stealth</div>
                    <div class="row">
                        <div class="col-2 text-end">Body %</div>
                        <div class="col-8 text-start">
                            <div class="progress bg-dark mt-2" role="progressbar">
                                <div class="progress-bar chart-bg enemy-bar" :style="`width: ${effectedWeapon.stealthNormal.Charged / enemy.Health * 100}%`">{{ (effectedWeapon.stealthNormal.Charged / enemy.Health * 100).toFixed(2) }}%</div>
                            </div>
                        </div>
                        <div class="col-2">To kill: {{ Math.ceil(enemy.Health / (effectedWeapon.stealthNormal.Charged)) }}</div>
                    </div>
                    <div class="row" v-for="weakPoint of Object.keys(enemy['Weak Points'])" :key="weakPoint">
                        <div class="col-2 text-end">{{ weakPoint }} %</div>
                        <div class="col-8 text-start">
                            <div class="progress bg-dark mt-2" role="progressbar">
                                <div class="progress-bar chart-bg enemy-bar" :style="`width: ${weakPointStealth(effectedWeapon, enemy, weakPoint) / enemy.Health * 100}%`">{{ (weakPointStealth(effectedWeapon, enemy, weakPoint) / enemy.Health * 100).toFixed(2) }}%</div>
                            </div>
                        </div>
                        <div class="col-2">To kill: {{ Math.ceil(enemy.Health / weakPointStealth(effectedWeapon, enemy, weakPoint)) }}</div>
                    </div>
                </div>
                <div class="row">
                    <div class="fw-bold">{{ enemy.Name }}<span v-if="weapon.Type === 'Knife'"> - Loud</span></div>
                    <div class="row">
                        <div class="col-2 text-end">Body %</div>
                        <div class="col-8 text-start">
                            <div class="progress bg-dark mt-2" role="progressbar">
                                <div class="progress-bar chart-bg enemy-bar" :style="`width: ${effectedWeapon.damage.Charged / enemy.Health * 100}%`">{{ (effectedWeapon.damage.Charged / enemy.Health * 100).toFixed(2) }}%</div>
                            </div>
                        </div>
                        <div class="col-2">To kill: {{ Math.ceil(enemy.Health / effectedWeapon.damage.Charged) }}</div>
                    </div>
                    <div class="row" v-for="weakPoint of Object.keys(enemy['Weak Points'])" :key="weakPoint">
                        <div class="col-2 text-end">{{ weakPoint }} %</div>
                        <div class="col-8 text-start">
                            <div class="progress bg-dark mt-2" role="progressbar">
                                <div class="progress-bar chart-bg enemy-bar" :style="`width: ${weakPointDamage(effectedWeapon, enemy, weakPoint) / enemy.Health * 100}%`">{{ (weakPointDamage(effectedWeapon, enemy, weakPoint) / enemy.Health * 100).toFixed(2) }}%</div>
                            </div>
                        </div>
                        <div class="col-2">To kill: {{ Math.ceil(enemy.Health / weakPointDamage(effectedWeapon, enemy, weakPoint)) }}</div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<style scoped>
</style>
