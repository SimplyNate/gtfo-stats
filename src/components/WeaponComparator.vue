<script setup lang="ts">
import { EnhancedEquipment } from '../data/equipment';
import { EnhancedWeapon } from '../data/weapons';
import { EnhancedMeleeWeapon } from '../data/melee';

const props = defineProps<{
    currentWeapon?: EnhancedEquipment;
    comparator?: EnhancedEquipment;
}>();
</script>

<template>
    <div></div>
</template>

<style scoped>

</style>
