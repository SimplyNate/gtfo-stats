<script setup lang="ts">
import WeaponSelection from '../components/WeaponSelection.vue';
import BoosterSelection from '../components/BoosterSelection.vue';
import { ref } from 'vue';
import { Weapon, EnhancedWeapon, mainWeapons, specialWeapons } from '../data/weapons';
import meleeWeapons, { MeleeWeapon } from '../data/melee';
import tools, { SentryTool } from '../data/tool';

const selectedWeapons = ref<(Weapon | MeleeWeapon | SentryTool)[]>(mainWeapons);
const selectionCategory = ref<string>();

function setSelection(selection: (Weapon | MeleeWeapon | SentryTool)[], category: string) {
    selectedWeapons.value = selection;
    selectionCategory.value = category;
}

const selectedMainWeapon = ref<EnhancedWeapon>();
const selectedSpecialWeapon = ref<EnhancedWeapon>();
const selectedTool = ref<SentryTool>();
const selectedMeleeWeapon = ref<MeleeWeapon>();

function setChoice(choice: Weapon | MeleeWeapon | SentryTool) {
    if (selectionCategory.value === 'main') {
        selectedMainWeapon.value = <EnhancedWeapon>choice;
    }
    else if (selectionCategory.value === 'special') {
        selectedSpecialWeapon.value = <EnhancedWeapon>choice;
    }
    else if (selectionCategory.value === 'tool') {
        selectedTool.value = <SentryTool>choice;
    }
    else if (selectionCategory.value === 'melee') {
        selectedMeleeWeapon.value = <MeleeWeapon>choice;
    }
}

</script>

<template>
    <div class="fullscreen">
        <div class="fw-bold">
            WEAPONS
        </div>
        <div class="d-flex">
            <div class="ps-3 pe-3">
                <weapon-selection :weapon="selectedMainWeapon" class="clickable" data-bs-toggle="modal" data-bs-target="#selectorModal" @click="setSelection(mainWeapons, 'main')"/>
            </div>
            <div class="ps-3 pe-3">
                <weapon-selection :weapon="selectedSpecialWeapon" class="clickable" data-bs-toggle="modal" data-bs-target="#selectorModal" @click="setSelection(specialWeapons, 'special')"/>
            </div>
        </div>
        <div class="d-flex mt-2">
            <div class="ps-3 pe-3">
                <weapon-selection :weapon="selectedTool" class="clickable" data-bs-toggle="modal" data-bs-target="#selectorModal" @click="setSelection(tools, 'tool')"/>
            </div>
            <div class="ps-3 pe-3">
                <weapon-selection :weapon="selectedMeleeWeapon" class="clickable" data-bs-toggle="modal" data-bs-target="#selectorModal" @click="setSelection(meleeWeapons, 'melee')"/>
            </div>
        </div>
        <div class="d-flex mt-2">
            <div class="ps-3 pe-3"><booster-selection/></div>
            <div class="ps-3 pe-3"><booster-selection/></div>
            <div class="ps-3 pe-3"><booster-selection/></div>
        </div>
    </div>
    <teleport to="body">
        <div class="modal modal-xl" id="selectorModal">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="container-fluid" style="background-color: #010508; color: #d3f7ff;">
                        <div class="row border" v-for="weapon of selectedWeapons" :key="weapon.Name" @click="setChoice(weapon)">
                            <div class="col">
                                {{ weapon.Type }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal" id="boosterSelectorModal">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            </div>
        </div>
    </teleport>
</template>

<style scoped>
.clickable {
    cursor: pointer;
}
</style>
