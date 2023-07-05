<script setup lang="ts">
import Weapon from '../components/Weapon.vue';
import { mainWeapons, mainMaximums } from '../data/weapons';

</script>

<template>
    <div>
        <weapon v-for="item of mainWeapons" :key="item.Name" :weapon-values="item" :total-values="mainMaximums"/>
    </div>
</template>

<style scoped>

</style>
