<template>
    <div class="app">
        <weapon v-for="item of main" :key="item.Name" :weapon-values="item"/>
    </div>
</template>

<script setup lang="ts">
import enemies from './data/enemies';
import main from './data/mainWeapons';
import melee from './data/melee';
import special from './data/special';
import tool from './data/tool';

import Weapon from './components/Weapon.vue';

</script>

<style scoped>
.app {
    width: 100%;
    background-color: #242424;
    color: white;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
}
</style>
