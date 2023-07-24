<script setup lang="ts">
import Weapon from '../components/Weapon.vue';
import { specialWeapons, specialMaximums, specialMinimums } from '../data/weapons';

</script>

<template>
    <div>
        <weapon v-for="item of specialWeapons" :key="item.Name" :weapon-values="item" :total-values="specialMaximums" :minimum-values="specialMinimums"/>
    </div>
</template>

<style scoped>

</style>
