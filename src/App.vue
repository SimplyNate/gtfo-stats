<template>
    <div class="app">
        <div class="left-menu">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <button class="nav-link active">Main Weapons</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link active">Special Weapons</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link active">Melee Weapons</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link active">Sentry Tools</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link active">Enemies</button>
                </li>
            </ul>
        </div>
        <div class="right-content">
            <div class="fade show" id="mainWeapons">
                <weapon v-for="item of main" :key="item.Name" :weapon-values="item"/>
            </div>
            <div class="fade" id="specialWeapons">Special Weapons</div>
            <div class="fade" id="meleeWeapons">Melee Weapons</div>
            <div class="fade" id="tools">Tools</div>
            <div class="fade" id="enemies">Enemies</div></div>
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
    height: 100%;
    background-color: #242424;
    color: white;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
    display: flex;
}
.left-menu {
    width: 20%;
    height: 100%;
}
.right-content {
    width: 80%;
    height: 100%;
    overflow-y: auto;
}
</style>
