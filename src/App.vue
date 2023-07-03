<template>
    <div class="app" id="parallax">
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
                <li class="nav-item">
                    <button class="nav-link" @click="setView('graph')">Chart</button>
                </li>
            </ul>
        </div>
        <div class="right-content aberration-red">
            <main-weapons v-if="view === 'main'" />
            <special-weapons v-if="view === 'special'"/>
            <melee-weapons v-if="view === 'melee'"/>
            <tools v-if="view === 'tools'"/>
            <enemies v-if="view === 'enemies'"/>
            <weapon-chart v-if="view === 'graph'"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import MainWeapons from './pages/MainWeapons.vue';
import SpecialWeapons from './pages/SpecialWeapons.vue';
import MeleeWeapons from './pages/MeleeWeapons.vue';
import Tools from './pages/Tools.vue';
import Enemies from './pages/Enemies.vue';
import WeaponChart from './pages/WeaponChart.vue';

const view = ref<string>('main');

function setView(v: string) {
    view.value = v;
}

let elem: HTMLElement;

function parallax(e: MouseEvent) {
    let _w = window.innerWidth / 2;
    let _h = window.innerHeight / 2;
    let _mouseX = e.clientX;
    let _mouseY = e.clientY;
    const ratio = window.innerWidth / window.innerHeight;
    let wCompensation = 1;
    let hCompensation = 1;
    if (ratio > 1) {
        hCompensation = ratio;
    }
    else {
        wCompensation = 1/ratio;
    }
    let depth = `translate(${0 - (_mouseX - _w) * 0.002 * wCompensation}%, ${0 - (_mouseY - _h) * 0.002 * hCompensation}%)`;
    elem.setAttribute('style', `transform: ${depth}`);
}

onMounted(() => {
    elem = <HTMLElement>document.getElementById('parallax');
    document.addEventListener('mousemove', parallax);
});

onBeforeUnmount(() => {
    document.removeEventListener('mousemove', parallax)
});

</script>

<style scoped>
.app {
    width: 100vw;
    height: 100vh;
    background-color: #010508;
    color: #d3f7ff;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
    display: flex;
    position: fixed;
    left: 0;
    top: 0;
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
.aberration-red {
    text-shadow: 2px -2px 0 #3e0406;
}
</style>
