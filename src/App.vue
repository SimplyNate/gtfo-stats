<template>
    <div class="app">
        <div>
            <ul class="nav nav-underline">
                <li class="nav-item">
                    <a class="nav-link active" data-bs-toggle="collapse" href="#mainWeapons">Main Weapons</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="collapse" href="#specialWeapons">Special Weapons</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="collapse" href="#meleeWeapons">Melee Weapons</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="collapse" href="#tools">Tools</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="collapse" href="#enemies">Enemies</a>
                </li>
            </ul>
        </div>
        <div class="fade show" id="mainWeapons">
            <weapon v-for="item of main" :key="item.Name" :weapon-values="item"/>
        </div>
        <div class="fade" id="specialWeapons">Special Weapons</div>
        <div class="fade" id="meleeWeapons">Melee Weapons</div>
        <div class="fade" id="tools">Tools</div>
        <div class="fade" id="enemies">Enemies</div>
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
