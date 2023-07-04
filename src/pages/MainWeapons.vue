<script setup lang="ts">
import Weapon from '../components/Weapon.vue';
import { mainWeapons } from '../data/weapons';

</script>

<template>
    <div>
        <weapon v-for="item of mainWeapons" :key="item.Name" :weapon-values="item"/>
    </div>
</template>

<style scoped>

</style>
