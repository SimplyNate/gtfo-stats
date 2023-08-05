<script setup lang="ts">
import { computed } from 'vue';
import { Booster } from '../data/boosters';
import { EnhancedWeapon, mainMaximums, specialMaximums } from '../data/weapons';
import {EnhancedMeleeWeapon, meleeMaximums} from '../data/melee';
import MeleeStats from './MeleeStats.vue';
import { EnhancedTool } from '../data/tool';
import WeaponStats from "./WeaponStats.vue";

const props = defineProps<{
    mainWeapon?: EnhancedWeapon;
    specialWeapon?: EnhancedWeapon;
    tool?: EnhancedTool;
    meleeWeapon?: EnhancedMeleeWeapon;
    mutedBooster?: Booster;
    boldBooster?: Booster;
    aggressiveBooster?: Booster;
}>();

interface Player {
    [index: string]: number;
    Health: number;
    'Regen Cap': number;
    'Regen Speed': number;
    'Melee Resistance': number;
    'Projectile Resistance': number;
    'Infection Resistance': number;
    'Revive Speed': number;
    'Med Efficiency': number;
    'Supply Efficiency': number;
    'Main Ammo': number;
    'Special Ammo': number;
    'Tool Ammo': number;
    'Melee Damage': number;
    'Main Damage': number;
    'Special Damage': number;
    'C-Foam Portion': number;
    'Sentry CPU Speed': number;
    'Sentry Damage': number;
    'SR Sentry Damage': number;
    'Trip Mine Damage': number;
    'Glow Stick Power': number;
    'Fog Repeller Power': number;
    'Tracker CPU Speed': number;
    'Hacking Skill': number;
    'Bioscan Speed': number;
}

const defaults: Player = {
    Health: 100,
    'Regen Cap': 20,
    'Regen Speed': 0,
    'Melee Resistance': 0,
    'Projectile Resistance': 0,
    'Infection Resistance': 0,
    'Revive Speed': 0,
    'Med Efficiency': 0,
    'Supply Efficiency': 0,
    'Main Ammo': 0,
    'Special Ammo': 0,
    'Tool Ammo': 0,
    'Melee Damage': 0,
    'Main Damage': 0,
    'Special Damage': 0,
    'C-Foam Portion': 0,
    'Sentry CPU Speed': 0,
    'Sentry Damage': 0,
    'SR Sentry Damage': 0,
    'Trip Mine Damage': 0,
    'Glow Stick Power': 0,
    'Fog Repeller Power': 0,
    'Tracker CPU Speed': 0,
    'Hacking Skill': 0,
    'Bioscan Speed': 0,
};

const computedPlayer = computed(() => {
    const player: Player =  {
        Health: 0,
        'Regen Cap': 0,
        'Regen Speed': 0,
        'Melee Resistance': 0,
        'Projectile Resistance': 0,
        'Infection Resistance': 0,
        'Revive Speed': 0,
        'Med Efficiency': 0,
        'Supply Efficiency': 0,
        'Main Ammo': 0,
        'Special Ammo': 0,
        'Tool Ammo': 0,
        'Melee Damage': 0,
        'Main Damage': 0,
        'Special Damage': 0,
        'C-Foam Portion': 0,
        'Sentry CPU Speed': 0,
        'Sentry Damage': 0,
        'SR Sentry Damage': 0,
        'Trip Mine Damage': 0,
        'Glow Stick Power': 0,
        'Fog Repeller Power': 0,
        'Tracker CPU Speed': 0,
        'Hacking Skill': 0,
        'Bioscan Speed': 0,
    };
    if (props.mutedBooster) {
        for (const effect of props.mutedBooster.positive) {
            player[effect.stat] += effect.value;
        }
    }
    if (props.boldBooster) {
        for (const effect of props.boldBooster.positive) {
            player[effect.stat] += effect.value;
        }
        for (const effect of props.boldBooster.negative) {
            player[effect.stat] += effect.value;
        }
    }
    if (props.aggressiveBooster) {
        for (const effect of props.aggressiveBooster.positive) {
            player[effect.stat] += effect.value;
        }
        for (const effect of props.aggressiveBooster.negative) {
            player[effect.stat] += effect.value;
        }
    }
    return player;
});

const keys = Object.keys(computedPlayer.value);

function calculateWidth(key: string) {
    return computedPlayer.value[key] * 100;
}

const computedConditions = computed(() => {
    const conditions: {[index: string]: string} = {};
    if (props.mutedBooster) {
        for (const effect of props.mutedBooster.condition) {
            conditions[effect.name] = effect.description;
        }
    }
    if (props.boldBooster) {
        for (const effect of props.boldBooster.condition) {
            conditions[effect.name] = effect.description;
        }
    }
    if (props.aggressiveBooster) {
        for (const effect of props.aggressiveBooster.condition) {
            conditions[effect.name] = effect.description;
        }
    }
    return conditions;
});
</script>

<template>
    <div class="mb-5">
        <div class="p-2">
            <h5 class="fw-bold">Player Stats</h5>
            <template v-for="key of keys" :key="key">
                <template v-if="calculateWidth(key) !== 0">
                    <div>
                        {{ key }}<span v-if="defaults[key] > 0">&nbsp;-&nbsp;{{ defaults[key] + (defaults[key] * computedPlayer[key]) }}</span><span v-if="calculateWidth(key) !== 0">&nbsp;(<span v-if="calculateWidth(key) > 0">&plus;</span>{{ (computedPlayer[key] * 100).toFixed(2) }}%)</span>
                    </div>
                    <div class="progress bg-dark" role="progressbar" style="height: 5px;">
                        <div v-if="calculateWidth(key) >= 0" class="progress-bar chart-bg-best" :style="`width: ${calculateWidth(key)}%`"></div>
                        <div v-else class="progress-bar chart-bg-danger" :style="`width: ${Math.abs(calculateWidth(key))}%`"></div>
                    </div>
                </template>
            </template>
            <template v-if="Object.keys(computedConditions).length > 0">
                <h5 class="mt-3 fw-bold font-yellow">Conditions Applied</h5>
                <div v-for="key of Object.keys(computedConditions)" :key="key">
                    <div class="fw-bold font-yellow">{{ key }}</div>
                    <div class="font-yellow">{{ computedConditions[key] }}</div>
                </div>
            </template>
        </div>
        <weapon-stats v-if="mainWeapon"
                :weapon="mainWeapon"
                :damage-boost="computedPlayer['Main Damage']"
                :ammo-boost="computedPlayer['Main Ammo']"
                :refill-boost="computedPlayer['Supply Efficiency']"
                :maximums="mainMaximums"/>
        <weapon-stats v-if="specialWeapon"
                      :weapon="specialWeapon"
                      :damage-boost="computedPlayer['Special Damage']"
                      :ammo-boost="computedPlayer['Special Ammo']"
                      :refill-boost="computedPlayer['Supply Efficiency']"
                      :maximums="specialMaximums"/>
        <melee-stats v-if="meleeWeapon"
                     :weapon="meleeWeapon"
                     :damage-boost="computedPlayer['Melee Damage']"
                     :maximums="meleeMaximums"/>
    </div>
</template>

<style scoped>
</style>
