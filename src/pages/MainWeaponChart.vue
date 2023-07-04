<script setup lang="ts">
import WeaponChart from '../components/WeaponChart.vue';
import { mainWeapons } from '../data/weapons';
</script>

<template>
    <weapon-chart :weapons="mainWeapons"/>
</template>

<style scoped>

</style>
