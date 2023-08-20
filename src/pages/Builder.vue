<script setup lang="ts">
import WeaponSelection from '../components/WeaponSelection.vue';
import BoosterSelection from '../components/BoosterSelection.vue';
import { ref } from 'vue';
import { EnhancedWeapon, mainWeapons, specialWeapons } from '../data/weapons';
import meleeWeapons, { EnhancedMeleeWeapon } from '../data/melee';
import tools from '../data/tool';
import PlayerStats from '../components/PlayerStats.vue';
import {Booster, effectData, negativeData, conditions, EffectRange} from '../data/boosters';
import { useBuilderStore } from '../store';
import { EnhancedEquipment } from '../data/equipment';

const allTools = [
    ...tools.sentries,
    tools.bioTracker,
    tools.cFoamLauncher,
    tools.mineDeployer,
];

const store = useBuilderStore();

const selectedWeapons = ref<(EnhancedWeapon | EnhancedMeleeWeapon | EnhancedEquipment)[]>(mainWeapons);
const selectionCategory = ref<string>();
const boosterSelectionCategory = ref<string>('muted');

function setSelection(selection: (EnhancedWeapon | EnhancedMeleeWeapon | EnhancedEquipment)[], category: string) {
    selectedWeapons.value = selection;
    selectionCategory.value = category;
}

function setChoice(choice: EnhancedWeapon | EnhancedMeleeWeapon | EnhancedEquipment) {
    if (selectionCategory.value === 'main') {
        store.setMainWeapon(<EnhancedWeapon>choice);
    }
    else if (selectionCategory.value === 'special') {
        store.setSpecialWeapon(<EnhancedWeapon>choice);
    }
    else if (selectionCategory.value === 'tool') {
        store.setTool(<EnhancedEquipment>choice);
    }
    else if (selectionCategory.value === 'melee') {
        store.setMeleeWeapon(<EnhancedMeleeWeapon>choice);
    }
}

interface EffectChoice {
    [index: string]: {
        toggle: boolean;
        value: string;
    }
}

interface ConditionChoice {
    [index: string]: {
        toggle: boolean;
        name: string;
        description: string;
    };
}

const positiveEffectChoices = ref<EffectChoice>({});
const negativeEffectChoices = ref<EffectChoice>({});
const conditionChoices = ref<ConditionChoice>({});

function setBoosterChoice(choice: string) {
    boosterSelectionCategory.value = choice;
    resetBoosterState();
    setBoosterState();
}

function resetBoosterState() {
    for (const effect of effectData) {
        positiveEffectChoices.value[effect.stat] = {
            toggle: false,
            value: '0',
        };
    }
    for (const effect of negativeData) {
        negativeEffectChoices.value[effect.stat] = {
            toggle: false,
            value: '0',
        }
    }
    for (const condition of conditions) {
        conditionChoices.value[condition.name] = {
            toggle: false,
            name: condition.name,
            description: condition.description,
        };
    }
}

function deleteBooster() {
    resetBoosterState();
    store.setBooster(boosterSelectionCategory.value, undefined);
}

function setBoosterState() {
    const boosterRef = store.getBoosterRef(boosterSelectionCategory.value);
    if (boosterRef.value) {
        for (const effect of boosterRef.value.positive) {
            const name = effect.stat;
            const value = effect.value;
            positiveEffectChoices.value[name].toggle = true;
            positiveEffectChoices.value[name].value = value.toString();
        }
        for (const effect of boosterRef.value.negative) {
            const name = effect.stat;
            const value = effect.value;
            negativeEffectChoices.value[name].toggle = true;
            negativeEffectChoices.value[name].value = value.toString();
        }
        for (const condition of boosterRef.value.condition) {
            const name = condition.name;
            conditionChoices.value[name].toggle = true;
        }
    }
}

resetBoosterState();

function saveBooster() {
    const booster: Booster =  {
        positive: [],
        negative: [],
        condition: [],
    };
    for (const key of Object.keys(positiveEffectChoices.value)) {
        const effect = positiveEffectChoices.value[key];
        if (effect.toggle) {
            booster.positive.push({
                stat: key,
                value: Number.parseFloat(effect.value),
            });
        }
    }
    for (const key of Object.keys(negativeEffectChoices.value)) {
        const effect = negativeEffectChoices.value[key];
        if (effect.toggle) {
            booster.negative.push({
                stat: key,
                value: Number.parseFloat(effect.value),
            });
        }
    }
    for (const key of Object.keys(conditionChoices.value)) {
        const condition = conditionChoices.value[key];
        if (condition.toggle) {
            booster.condition.push({
                name: condition.name,
                description: condition.description,
            });
        }
    }
    store.setBooster(boosterSelectionCategory.value, booster);
}

function setComparator(equipment: EnhancedEquipment) {
    console.log(equipment);
}

</script>

<template>
    <div class="fullscreen d-flex">
        <div class="pt-2">
            <h5 class="fw-bold">WEAPONS</h5>
            <div class="d-flex">
                <div class="p-2 clickable rounded">
                    <weapon-selection :weapon="store.selectedMainWeapon" data-bs-toggle="modal" data-bs-target="#selectorModal" @click="setSelection(mainWeapons, 'main')"/>
                </div>
                <div class="p-2 clickable rounded">
                    <weapon-selection :weapon="store.selectedSpecialWeapon" data-bs-toggle="modal" data-bs-target="#selectorModal" @click="setSelection(specialWeapons, 'special')"/>
                </div>
            </div>
            <div class="d-flex mt-2">
                <div class="p-2 clickable rounded">
                    <weapon-selection :weapon="store.selectedTool" data-bs-toggle="modal" data-bs-target="#selectorModal" @click="setSelection(allTools, 'tool')"/>
                </div>
                <div class="p-2 clickable rounded">
                    <weapon-selection :weapon="store.selectedMeleeWeapon" data-bs-toggle="modal" data-bs-target="#selectorModal" @click="setSelection(meleeWeapons, 'melee')"/>
                </div>
            </div>
            <div class="d-flex mt-2">
                <div class="p-2 clickable rounded"><booster-selection tier="Muted" :booster="store.selectedMutedBooster" data-bs-toggle="modal" data-bs-target="#boosterSelectorModal" @click="setBoosterChoice('muted')"/></div>
                <div class="p-2 clickable rounded"><booster-selection tier="Bold" :booster="store.selectedBoldBooster" data-bs-toggle="modal" data-bs-target="#boosterSelectorModal" @click="setBoosterChoice('bold')"/></div>
                <div class="p-2 clickable rounded"><booster-selection tier="Aggressive" :booster="store.selectedAggressiveBooster" data-bs-toggle="modal" data-bs-target="#boosterSelectorModal" @click="setBoosterChoice('aggressive')"/></div>
            </div>
        </div>
        <div class="flex-fill me-3 ms-3">
            <player-stats
                :aggressive-booster="store.selectedAggressiveBooster"
                :melee-weapon="<EnhancedMeleeWeapon>store.selectedMeleeWeapon"
                :muted-booster="store.selectedMutedBooster"
                :special-weapon="<EnhancedWeapon>store.selectedSpecialWeapon"
                :main-weapon="<EnhancedWeapon>store.selectedMainWeapon"
                :bold-booster="store.selectedBoldBooster"
                :tool="store.selectedTool"/>
        </div>
    </div>
    <teleport to="body">
        <div class="modal modal-xl" id="selectorModal">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="container-fluid" style="background-color: #010508; color: #d3f7ff;">
                        <div class="row">
                            <div class="col-2">
                                <div class="row border clickable" v-for="weapon of selectedWeapons" :key="weapon.Name" @click="setChoice(<EnhancedWeapon | EnhancedEquipment | EnhancedMeleeWeapon>weapon)" data-bs-dismiss="modal" @mouseover="setComparator(weapon)">
                                    <div class="pt-1 pb-1">
                                        {{ weapon.Type }}
                                    </div>
                                </div>
                            </div>
                            <div class="col-10">
                                <div class="container-fluid">Weapon Preview</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal modal-xl" id="boosterSelectorModal">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content border">
                    <div class="container-fluid" style="background-color: #010508; color: #d3f7ff; overflow-y: auto; overflow-x: hidden;">
                        <div class="d-flex justify-content-between mt-2">
                            <h4>Create new {{ boosterSelectionCategory }} Booster</h4>
                            <div>
                                <button class="btn btn-outline-secondary rounded-0 me-3 menu-button" data-bs-dismiss="modal">Close</button>
                                <button class="btn btn-outline-danger rounded-0 me-3 menu-button" @click="deleteBooster" v-if="store.getBoosterRef(boosterSelectionCategory).value">Delete Booster</button>
                                <button class="btn btn-outline-warning rounded-0 me-3 menu-button" @click="resetBoosterState">Reset Booster Changes</button>
                                <button class="btn btn-outline-success rounded-0 menu-button" @click="saveBooster" data-bs-dismiss="modal">Save Booster</button>
                            </div>
                        </div>
                        <!-- Positive Effects -->
                        <div class="row ms-1 mb-2">
                            <div class="list-group col">
                                <h5>Positive Effects</h5>
                                <div class="list-group-item" style="background-color: #010508; color: #d3f7ff;" v-for="effect of effectData" :key="effect.stat">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h5 class="mb-1">{{ effect.stat }}</h5>
                                        <div class="form-check form-switch">
                                            <input class="form-check-input" type="checkbox" role="switch" v-model="positiveEffectChoices[effect.stat].toggle">
                                        </div>
                                    </div>
                                    <template v-if="positiveEffectChoices[effect.stat].toggle">
                                        <label>Value: {{ Math.round(Number.parseFloat(positiveEffectChoices[effect.stat].value) * 100) }}%</label>
                                        <input type="range" class="custom-range" :min="`${(<EffectRange>effect[boosterSelectionCategory]).min}`" :max="`${(<EffectRange>effect[boosterSelectionCategory]).max}`" step="0.01" v-model="positiveEffectChoices[effect.stat].value">
                                    </template>
                                </div>
                            </div>
                            <!-- Negative Effects -->
                            <div v-if="boosterSelectionCategory !== 'muted'" class="list-group col">
                                <h5>Negative Effects</h5>
                                <template v-for="effect of negativeData" :key="effect.stat">
                                    <div class="list-group-item" style="background-color: #010508; color: #d3f7ff;" v-if="effect[boosterSelectionCategory]">
                                        <div class="d-flex w-100 justify-content-between">
                                            <h5 class="mb-1">{{ effect.stat }}</h5>
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" role="switch" v-model="negativeEffectChoices[effect.stat].toggle">
                                            </div>
                                        </div>
                                        <template v-if="negativeEffectChoices[effect.stat].toggle">
                                            <label>Value: {{ Math.round(Number.parseFloat(negativeEffectChoices[effect.stat].value) * 100) }}%</label>
                                            <input type="range" class="custom-range" :min="`${(<EffectRange>effect[boosterSelectionCategory]).min}`" :max="`${(<EffectRange>effect[boosterSelectionCategory]).max}`" step="0.01" v-model="negativeEffectChoices[effect.stat].value">
                                        </template>
                                    </div>
                                </template>
                            </div>
                            <div class="list-group col">
                                <h5>Conditions</h5>
                                <div class="list-group-item" style="background-color: #010508; color: #d3f7ff;" v-for="condition of conditions">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h5 class="mb-1">{{ condition.name }}</h5>
                                        <div class="form-check form-switch">
                                            <input class="form-check-input" type="checkbox" role="switch" v-model="conditionChoices[condition.name].toggle">
                                        </div>
                                    </div>
                                    <small>{{ condition.description }}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<style scoped>
.custom-range {
    height: 4px;
    background: #8bacbe;
    width: 100%;
    outline: none;
}
</style>
