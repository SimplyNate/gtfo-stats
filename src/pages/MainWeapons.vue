<script setup lang="ts">
import Weapon from '../components/Weapon.vue';
import {mainWeapons, mainMaximums, mainMinimums} from '../data/weapons';

</script>

<template>
    <div>
        <weapon v-for="item of mainWeapons" :key="item.Name" :weapon-values="item" :total-values="mainMaximums" :minimum-values="mainMinimums"/>
    </div>
</template>

<style scoped>

</style>
