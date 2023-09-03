<script setup lang="ts">
import { EnhancedEquipment } from '../data/equipment';
import Stat from './Stat.vue';

defineProps<{
    currentWeapon?: EnhancedEquipment;
    comparator?: EnhancedEquipment;
    totalValues: any;
}>();

</script>

<template>
    <div class="container-fluid">Weapon Preview -
        <span v-if="currentWeapon">{{ currentWeapon?.Type}} vs </span>
        <span v-if="comparator">{{ comparator?.Type }}</span>
    </div>
    <div v-if="currentWeapon && comparator">
        <stat v-for="key of Object.keys(currentWeapon.keys)" :title="currentWeapon.keys[key]" :original-value="currentWeapon[key]" :new-value="comparator[key]" :max-value="totalValues[key]"/>
        <stat v-for="key of currentWeapon.equipmentKeys" :title="key" :original-value="currentWeapon.equipment[key]" :new-value="comparator.equipment[key]" :max-value="totalValues[key]"/>
    </div>
    <div v-else-if="currentWeapon">
        <stat v-for="key of Object.keys(currentWeapon.keys)" :title="currentWeapon.keys[key]" :original-value="currentWeapon[key]" :new-value="currentWeapon[key]" :max-value="totalValues[key]"/>
        <stat v-for="key of currentWeapon.equipmentKeys" :title="key" :original-value="currentWeapon.equipment[key]" :new-value="currentWeapon.equipment[key]" :max-value="totalValues[key]"/>
    </div>
    <div v-else-if="comparator">
        <stat v-for="key of Object.keys(comparator.keys)" :title="comparator.keys[key]" :original-value="comparator[key]" :new-value="comparator[key]" :max-value="totalValues[key]"/>
        <stat v-for="key of comparator.equipmentKeys" :title="key" :original-value="comparator.equipment[key]" :new-value="comparator.equipment[key]" :max-value="totalValues[key]"/>
    </div>
    <div v-else>
        Hover over a weapon to preview the stats.
    </div>
</template>

<style scoped>

</style>
