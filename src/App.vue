<template>
    <div class="app" id="parallax">
        <div class="left-menu ps-3 pe-3">
            <ul class="nav flex-column">
                <li class="nav-item menu-item clickable">
                    <h3 class="menu-item-text" @click="setView('main')">MAIN WEAPONS</h3>
                </li>
                <li class="nav-item menu-item clickable">
                    <h3 class="menu-item-text" @click="setView('special')">SPECIAL WEAPONS</h3>
                </li>
                <li class="nav-item menu-item clickable">
                    <h3 class="menu-item-text" @click="setView('melee')">MELEE WEAPONS</h3>
                </li>
                <li class="nav-item menu-item clickable">
                    <h3 class="menu-item-text" @click="setView('tools')">TOOLS</h3>
                </li>
                <li class="nav-item menu-item clickable">
                    <h3 class="menu-item-text" @click="setView('enemies')">ENEMIES</h3>
                </li>
                <li class="nav-item menu-item clickable">
                    <h3 class="menu-item-text" @click="setView('main-graph')">MAIN CHART</h3>
                </li>
                <li class="nav-item menu-item clickable">
                    <h3 class="menu-item-text" @click="setView('special-graph')">SPECIAL CHART</h3>
                </li>
                <li class="nav-item menu-item clickable">
                    <h3 class="menu-item-text" @click="setView('builder')">BUILDER</h3>
                </li>
            </ul>
            <div class="ms-3 mt-2 opacity-25">
                <div class="form-check form-switch">
                    <input type="checkbox" role="switch" class="form-check-input" v-model="enableParallax"/>
                    <label class="form-check-label">Enable Parallax</label>
                </div>
            </div>
        </div>
        <div class="right-content aberration-red">
            <main-weapons v-if="view === 'main'" />
            <special-weapons v-if="view === 'special'"/>
            <melee-weapons v-if="view === 'melee'"/>
            <tools v-if="view === 'tools'"/>
            <enemies v-if="view === 'enemies'"/>
            <main-weapon-chart v-if="view === 'main-graph'"/>
            <special-chart v-if="view === 'special-graph'"/>
            <home v-if="view === 'builder'"/>
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
import MainWeaponChart from './pages/MainWeaponChart.vue';
import SpecialChart from './pages/SpecialChart.vue';
import Home from "./pages/Builder.vue";

const view = ref<string>('main');
const enableParallax = ref(false);

function setView(v: string) {
    view.value = v;
}

let elem: HTMLElement;

function parallax(e: MouseEvent) {
    if (!enableParallax.value) {
        elem.setAttribute('style', `transform: translate(0, 0)`);
        return;
    }
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
    font-family: monospace;
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
