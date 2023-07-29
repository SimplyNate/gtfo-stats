<script setup lang="ts">
import { EnhancedWeapon } from '../data/weapons';
import enemies, { Enemy } from '../data/enemies';
import { ref, computed } from 'vue';
import Stat from "./Stat.vue";

const props = defineProps<{
    weapon: EnhancedWeapon;
    maximums: any;
    damageBoost: number;
    ammoBoost: number;
}>();

const effectedWeapon = computed(() => {
    const newWeapon = new EnhancedWeapon(props.weapon.weapon);
    newWeapon.modifier = props.damageBoost;
    newWeapon.ammoMod = props.ammoBoost;
    return newWeapon;
});

const displayKeys: {[index: string]: string} = {
    damage: 'Damage',
    precision: 'Precision Damage',
    stagger: 'Stagger Damage',
    damagePerMag: 'Damage Per Mag',
    totalDamage: 'Total Damage',
    dps: 'DPS',
    effectiveDPS: 'Effective DPS',
    precisionDPS: 'Precision DPS',
    effectivePrecisionDPS: 'Effective Precision DPS',
    startingAmmo: 'Starting Ammo',
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
function weakPointDamage(weapon: EnhancedWeapon, enemy: Enemy, enemyWeakPoint: string) {
    return weapon.precision * enemy['Weak Points'][enemyWeakPoint].Multiplier;
}

</script>

<template>
    <div class="clickable" @click="toggleMore">
        <h5 class="mt-3 fw-bold">{{ weapon.Type }}</h5>
        <stat v-for="key of Object.keys(displayKeys)" :key="key"
              :title="displayKeys[key]"
              :original-value="weapon[key]"
              :new-value="effectedWeapon[key]"
              :max-value="maximums[displayKeys[key]]"/>
        <template v-if="showMore">
            <div class="row mt-3" v-for="enemy of enemies" :key="enemy.Name">
                <div class="fw-bold">{{ enemy.Name }}</div>
                <div class="row">
                    <div class="col-2 text-end">Body %</div>
                    <div class="col-6 text-start">
                        <div class="progress bg-dark mt-2" role="progressbar">
                            <div class="progress-bar chart-bg enemy-bar" :style="`width: ${effectedWeapon.damage / enemy.Health * 100}%`">{{ (effectedWeapon.damage / enemy.Health * 100).toFixed(2) }}%</div>
                        </div>
                    </div>
                    <div class="col-2">To kill: {{ Math.ceil(enemy.Health / effectedWeapon.damage) }}</div>
                    <div class="col-2">Waste: {{ (((Math.ceil(enemy.Health / effectedWeapon.damage) * effectedWeapon.damage) - enemy.Health) / effectedWeapon.damage * 100).toFixed(2) }}%</div>
                </div>
                <div class="row" v-for="weakPoint of Object.keys(enemy['Weak Points'])" :key="weakPoint">
                    <div class="col-2 text-end">{{ weakPoint }} %</div>
                    <div class="col-6 text-start">
                        <div class="progress bg-dark mt-2" role="progressbar">
                            <div class="progress-bar chart-bg enemy-bar" :style="`width: ${weakPointDamage(effectedWeapon, enemy, weakPoint) / enemy.Health * 100}%`">{{ (weakPointDamage(effectedWeapon, enemy, weakPoint) / enemy.Health * 100).toFixed(2) }}%</div>
                        </div>
                    </div>
                    <div class="col-2">To kill: {{ Math.ceil(enemy.Health / weakPointDamage(effectedWeapon, enemy, weakPoint)) }}</div>
                    <div class="col-2">Waste: {{ (((Math.ceil(enemy.Health / weakPointDamage(effectedWeapon, enemy, weakPoint)) * weakPointDamage(effectedWeapon, enemy, weakPoint)) - enemy.Health) / weakPointDamage(effectedWeapon, enemy, weakPoint) * 100).toFixed(2) }}%</div>
                </div>
            </div>
        </template>
    </div>
</template>

<style scoped>
</style>
