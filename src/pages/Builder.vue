<script setup lang="ts">
import WeaponSelection from '../components/WeaponSelection.vue';
import BoosterSelection from '../components/BoosterSelection.vue';
import { ref } from 'vue';
import { EnhancedWeapon, mainWeapons, specialWeapons } from '../data/weapons';
import meleeWeapons, { EnhancedMeleeWeapon } from '../data/melee';
import tools, { SentryTool } from '../data/tool';
import PlayerStats from '../components/PlayerStats.vue';
import {Booster, effectData, negativeData, conditions, EffectRange} from '../data/boosters';

const selectedWeapons = ref<(EnhancedWeapon | EnhancedMeleeWeapon | SentryTool)[]>(mainWeapons);
const selectionCategory = ref<string>();
const boosterSelectionCategory = ref<string>('muted');

function setSelection(selection: (EnhancedWeapon | EnhancedMeleeWeapon | SentryTool)[], category: string) {
    selectedWeapons.value = selection;
    selectionCategory.value = category;
}

const selectedMainWeapon = ref<EnhancedWeapon>();
const selectedSpecialWeapon = ref<EnhancedWeapon>();
const selectedTool = ref<SentryTool>();
const selectedMeleeWeapon = ref<EnhancedMeleeWeapon>();

const selectedMutedBooster = ref<Booster>();
const selectedBoldBooster = ref<Booster>();
const selectedAggressiveBooster = ref<Booster>();

function setChoice(choice: EnhancedWeapon | EnhancedMeleeWeapon | SentryTool) {
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
        selectedMeleeWeapon.value = <EnhancedMeleeWeapon>choice;
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

function getBoosterRef() {
    let boosterRef;
    if (boosterSelectionCategory.value === 'muted') {
        boosterRef = selectedMutedBooster;
    }
    else if (boosterSelectionCategory.value === 'bold') {
        boosterRef = selectedBoldBooster;
    }
    else {
        boosterRef = selectedAggressiveBooster;
    }
    return boosterRef;
}

function setBoosterState() {
    const boosterRef = getBoosterRef();
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
    const boosterRef = getBoosterRef();
    boosterRef.value = {
        positive: [],
        negative: [],
        condition: [],
    };
    for (const key of Object.keys(positiveEffectChoices.value)) {
        const effect = positiveEffectChoices.value[key];
        if (effect.toggle) {
            boosterRef.value.positive.push({
                stat: key,
                value: Number.parseFloat(effect.value),
            });
        }
    }
    for (const key of Object.keys(negativeEffectChoices.value)) {
        const effect = negativeEffectChoices.value[key];
        if (effect.toggle) {
            boosterRef.value.negative.push({
                stat: key,
                value: Number.parseFloat(effect.value),
            });
        }
    }
    for (const key of Object.keys(conditionChoices.value)) {
        const condition = conditionChoices.value[key];
        if (condition.toggle) {
            boosterRef.value.condition.push({
                name: condition.name,
                description: condition.description,
            });
        }
    }
}

</script>

<template>
    <div class="fullscreen d-flex">
        <div>
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
                <div class="ps-3 pe-3"><booster-selection tier="Muted" :booster="selectedMutedBooster" class="clickable" data-bs-toggle="modal" data-bs-target="#boosterSelectorModal" @click="setBoosterChoice('muted')"/></div>
                <div class="ps-3 pe-3"><booster-selection tier="Bold" :booster="selectedBoldBooster" class="clickable" data-bs-toggle="modal" data-bs-target="#boosterSelectorModal" @click="setBoosterChoice('bold')"/></div>
                <div class="ps-3 pe-3"><booster-selection tier="Aggressive" :booster="selectedAggressiveBooster" class="clickable" data-bs-toggle="modal" data-bs-target="#boosterSelectorModal" @click="setBoosterChoice('aggressive')"/></div>
            </div>
        </div>
        <div class="flex-fill me-3">
            <player-stats
                :aggressive-booster="selectedAggressiveBooster"
                :melee-weapon="selectedMeleeWeapon"
                :muted-booster="selectedMutedBooster"
                :special-weapon="selectedSpecialWeapon"
                :main-weapon="selectedMainWeapon"
                :bold-booster="selectedBoldBooster"
                :tool="selectedTool"/>
        </div>
    </div>
    <teleport to="body">
        <div class="modal modal-xl" id="selectorModal">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="container-fluid" style="background-color: #010508; color: #d3f7ff;">
                        <div class="row border clickable" v-for="weapon of selectedWeapons" :key="weapon.Name" @click="setChoice(<EnhancedWeapon | SentryTool | EnhancedMeleeWeapon>weapon)" data-bs-dismiss="modal">
                            <div class="col pt-1 pb-1">
                                {{ weapon.Type }}
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
                                <button class="btn btn-outline-danger me-3" @click="resetBoosterState">Reset Booster</button>
                                <button class="btn btn-outline-success" @click="saveBooster" data-bs-dismiss="modal">Save Booster</button>
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
                                        <input type="range" class="form-range" :min="`${(<EffectRange>effect[boosterSelectionCategory]).min}`" :max="`${(<EffectRange>effect[boosterSelectionCategory]).max}`" step="0.01" v-model="positiveEffectChoices[effect.stat].value">
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
                                            <input type="range" class="form-range" :min="`${(<EffectRange>effect[boosterSelectionCategory]).min}`" :max="`${(<EffectRange>effect[boosterSelectionCategory]).max}`" step="0.01" v-model="negativeEffectChoices[effect.stat].value">
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
</style>
