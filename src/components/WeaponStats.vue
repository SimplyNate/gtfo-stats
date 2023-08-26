<script setup lang="ts">
import { EnhancedWeapon } from '../data/weapons';
import enemies from '../data/enemies';
import { ref, computed } from 'vue';
import Stat from './Stat.vue';
import EnemyTargetStat from './EnemyTargetStat.vue';

const props = defineProps<{
    weapon: EnhancedWeapon;
    maximums: any;
    damageBoost: number;
    ammoBoost: number;
    refillBoost: number;
}>();

const effectedWeapon = computed(() => {
    const newWeapon = new EnhancedWeapon(props.weapon.equipment);
    newWeapon.damageModifier = props.damageBoost;
    newWeapon.ammoModifier = props.ammoBoost;
    newWeapon.refillModifier = props.refillBoost;
    return newWeapon;
});

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

function calculateAmmoPercentage(key: string) {
    if (key === 'ammoPerRefill') {
        return effectedWeapon.value.ammoPerRefill / (effectedWeapon.value.equipment['Max Ammo'] - effectedWeapon.value.equipment['Magazine Size']);
    }
    return undefined;
}

</script>

<template>
    <div class="p-2 clickable rounded" @click="toggleMore">
        <h5 class="fw-bold">{{ weapon.Type }}</h5>
        <stat v-for="key of Object.keys(weapon.keys)" :key="key"
              :title="weapon.keys[key]"
              :original-value="weapon[key]"
              :new-value="effectedWeapon[key]"
              :max-value="maximums[key]"
              :percentage="calculateAmmoPercentage(key)"/>
        <template v-if="showMore">
            <div class="row mt-3" v-for="enemy of enemies" :key="enemy.Name">
                <enemy-target-stat :weapon="effectedWeapon" :enemy="enemy" :damage-boost="damageBoost"/>
            </div>
        </template>
    </div>
</template>

<style scoped>
</style>
