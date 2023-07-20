<script setup lang="ts">
import WeaponSelection from '../components/WeaponSelection.vue';
import WeaponSelector from '../components/WeaponSelector.vue';
import BoosterSelection from '../components/BoosterSelection.vue';
import { ref } from 'vue';
import { Weapon, mainWeapons, specialWeapons } from '../data/weapons';
import meleeWeapons, { MeleeWeapon } from '../data/melee';
import tools, { SentryTool } from '../data/tool';

const selectedWeapons = ref<(Weapon | MeleeWeapon | SentryTool)[]>(mainWeapons);

function setSelection(selection: (Weapon | MeleeWeapon | SentryTool)[]) {
    selectedWeapons.value = selection;
}
</script>

<template>
    <div class="fullscreen">
        <div class="fw-bold">
            WEAPONS
        </div>
        <div class="d-flex">
            <div class="ps-3 pe-3">
                <weapon-selection class="clickable" data-bs-toggle="modal" data-bs-target="#selectorModal" @click="setSelection(mainWeapons)"/>
            </div>
            <div class="ps-3 pe-3">
                <weapon-selection class="clickable" data-bs-toggle="modal" data-bs-target="#selectorModal" @click="setSelection(specialWeapons)"/>
            </div>
        </div>
        <div class="d-flex mt-2">
            <div class="ps-3 pe-3">
                <weapon-selection class="clickable" data-bs-toggle="modal" data-bs-target="#selectorModal" @click="setSelection(tools)"/>
            </div>
            <div class="ps-3 pe-3">
                <weapon-selection class="clickable" data-bs-toggle="modal" data-bs-target="#selectorModal" @click="setSelection(meleeWeapons)"/>
            </div>
        </div>
        <div class="d-flex mt-2">
            <div class="ps-3 pe-3"><booster-selection/></div>
            <div class="ps-3 pe-3"><booster-selection/></div>
            <div class="ps-3 pe-3"><booster-selection/></div>
        </div>
    </div>
    <teleport to="body">
        <div class="modal" id="selectorModal">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <weapon-selector :weapons="selectedWeapons"></weapon-selector>
            </div>
        </div>
        <div class="modal" id="boosterSelectorModal">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <weapon-selector :weapons="selectedWeapons"></weapon-selector>
            </div>
        </div>
    </teleport>
</template>

<style scoped>
.clickable {
    cursor: pointer;
}
</style>
