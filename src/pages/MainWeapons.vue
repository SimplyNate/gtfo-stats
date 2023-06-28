<script setup lang="ts">
import Weapon from '../components/Weapon.vue';
import main from '../data/mainWeapons';

</script>

<template>
    <div>
        <weapon v-for="item of main" :key="item.Name" :weapon-values="item"/>
    </div>
</template>

<style scoped>

</style>
