<script setup lang="ts">
import type { EnhancedWeapon } from '../data/weapons';
import enemies, { Enemy } from '../data/enemies';
import { onMounted, ref } from 'vue';
import Stat from "./Stat.vue";

const props = defineProps<{
    weapon: EnhancedWeapon;
}>();

const displayKeys = {
    damage: 'Damage',
    precision: 'Precision Damage',
    stagger: 'Stagger Damage',
    damagePerMag: 'DamagePerMag',
    totalDamage: 'Total Damage',
    dps: 'DPS',
    effectiveDPS: 'Effective DPS',
    precisionDPS: 'Precision DPS',
    effectivePrecisionDPS: 'Effective Precision DPS'
};

const showMore = ref<boolean>(false);


</script>

<template>
    <div>
        <stat v-for="key of Object.keys(displayKeys)" :key="key"
              :title="displayKeys[key]"
              :original-value="weapon[key]"/>
    </div>
</template>

<style scoped>

</style>
