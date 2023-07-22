<script setup lang="ts">
import MeleeWeapon from '../components/MeleeWeapon.vue';
import meleeWeapons from '../data/melee';

</script>

<template>
    <div>
        <melee-weapon v-for="melee of meleeWeapons" :key="melee.Name" :melee="melee"/>
    </div>
</template>

<style scoped>
</style>
