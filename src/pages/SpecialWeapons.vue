<script setup lang="ts">
import Weapon from '../components/Weapon.vue';
import special from '../data/special';

</script>

<template>
    <div>
        <weapon v-for="item of special" :key="item.Name" :weapon-values="item"/>
    </div>
</template>

<style scoped>

</style>
