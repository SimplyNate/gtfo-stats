<template>
    <div class="app">
        <div class="left-menu">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <button class="nav-link active" @click="setView('main')">Main Weapons</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" @click="setView('special')">Special Weapons</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" @click="setView('melee')">Melee Weapons</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" @click="setView('tools')">Sentry Tools</button>
                </li>
                <li class="nav-item">
                    <button class="nav-link" @click="setView('enemies')">Enemies</button>
                </li>
            </ul>
        </div>
        <div class="right-content">
            <main-weapons v-if="view === 'main'" />
            <special-weapons v-if="view === 'special'"/>
            <melee-weapons v-if="view === 'melee'"/>
            <tools v-if="view === 'tools'"/>
            <enemies v-if="view === 'enemies'"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MainWeapons from './pages/MainWeapons.vue';
import SpecialWeapons from './pages/SpecialWeapons.vue';
import MeleeWeapons from './pages/MeleeWeapons.vue';
import Tools from './pages/Tools.vue';
import Enemies from './pages/Enemies.vue';

const view = ref<string>('main');

function setView(v: string) {
    view.value = v;
}

</script>

<style scoped>
.app {
    width: 100vw;
    height: 100vh;
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
