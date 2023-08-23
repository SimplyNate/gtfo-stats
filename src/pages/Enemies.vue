<script setup lang="ts">
import enemies from '../data/enemies';
import Enemy from '../components/Enemy.vue';

</script>

<template>
    <div>
        <enemy v-for="enemy of enemies" :enemy="enemy" :key="enemy.Name"/>
    </div>
</template>

<style scoped>

</style>
