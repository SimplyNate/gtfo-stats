<script setup lang="ts">
import { EnhancedMeleeWeapon } from '../data/melee';
import enemies, { Enemy } from '../data/enemies';
import { ref, computed } from 'vue';
import Stat from './Stat.vue';
import MeleeStatEnemy from './MeleeStatEnemy.vue';

const props = defineProps<{
    weapon: EnhancedMeleeWeapon;
    maximums: any;
    damageBoost: number;
}>();

const effectedWeapon = computed(() => {
    const newWeapon = new EnhancedMeleeWeapon(props.weapon.equipment);
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

function neededBoost(baseDamage: number, enemyHealth: number) {
    // boost = (enemyHealth / damage) - 1
    return Math.max(0, (enemyHealth / baseDamage) - 1 - props.damageBoost);
}

</script>

<template>
    <div class="p-2 clickable rounded" @click="toggleMore">
        <h5 class="fw-bold">{{ weapon.Type }}</h5>
        <stat v-for="key of Object.keys(displayKeys)" :key="key"
              :title="`${displayKeys[key]} - Uncharged`"
              :original-value="weapon[key].Uncharged"
              :new-value="effectedWeapon[key].Uncharged"
              :max-value="maximums[key].Uncharged"/>
        <stat v-for="key of Object.keys(displayKeys)" :key="key"
              :title="`${displayKeys[key]} - Charged`"
              :original-value="weapon[key].Charged"
              :new-value="effectedWeapon[key].Charged"
              :max-value="maximums[key].Charged"/>
        <template v-if="showMore">
            <div class="row mt-3" v-for="enemy of enemies" :key="enemy.Name">
                <div class="row" v-if="weapon.Type === 'Knife' && !enemy.Name.includes('Scout')">
                    <div class="fw-bold">{{ enemy.Name }} - Stealth</div>
                    <melee-stat-enemy target="Body"
                                      :damage-percent="effectedWeapon.stealth.Charged / enemy.Health * 100"
                                      :to-kill="Math.ceil(enemy.Health / (effectedWeapon.stealth.Charged))"
                                      :booster-needed="neededBoost(weapon.stealth.Charged, enemy.Health) * 100"/>
                    <melee-stat-enemy v-for="weakPoint of Object.keys(enemy['Weak Points'])" :key="weakPoint"
                                      :target="weakPoint"
                                      :damage-percent="weakPointStealth(effectedWeapon, enemy, weakPoint) / enemy.Health * 100"
                                      :to-kill="Math.ceil(enemy.Health / weakPointStealth(effectedWeapon, enemy, weakPoint))"
                                      :booster-needed="neededBoost(weakPointStealth(weapon, enemy, weakPoint), enemy.Health) * 100"/>
                </div>
                <div class="row">
                    <div class="fw-bold">{{ enemy.Name }}<span v-if="weapon.Type === 'Knife'"> - Loud</span></div>
                    <melee-stat-enemy target="Body"
                                      :damage-percent="effectedWeapon.damage.Charged / enemy.Health * 100"
                                      :to-kill="Math.ceil(enemy.Health / effectedWeapon.damage.Charged)"
                                      :booster-needed="neededBoost(weapon.damage.Charged, enemy.Health) * 100"/>
                    <melee-stat-enemy v-for="weakPoint of Object.keys(enemy['Weak Points'])" :key="weakPoint"
                                      :target="weakPoint"
                                      :damage-percent="weakPointDamage(effectedWeapon, enemy, weakPoint) / enemy.Health * 100"
                                      :to-kill="Math.ceil(enemy.Health / weakPointDamage(effectedWeapon, enemy, weakPoint))"
                                      :booster-needed="neededBoost(weakPointDamage(weapon, enemy, weakPoint), enemy.Health) * 100"
                                      />
                </div>
            </div>
        </template>
    </div>
</template>

<style scoped>
</style>
