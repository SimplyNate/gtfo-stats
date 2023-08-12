<script setup lang="ts">
import { EnhancedMeleeWeapon } from '../data/melee';
import enemies from '../data/enemies';
import { ref, computed } from 'vue';
import Stat from './Stat.vue';
import EnemyTargetStat from "./EnemyTargetStat.vue";

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
                <enemy-target-stat :enemy="enemy" :melee="effectedWeapon" :damage-boost="damageBoost"/>
            </div>
        </template>
    </div>
</template>

<style scoped>
</style>
