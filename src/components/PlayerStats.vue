<script setup lang="ts">
import { computed } from 'vue';
import { Booster } from '../data/boosters';
import { EnhancedWeapon, mainMaximums, specialMaximums } from '../data/weapons';
import {EnhancedMeleeWeapon, meleeMaximums} from '../data/melee';
import MeleeStats from './MeleeStats.vue';
import { SentryTool } from '../data/tool';
import WeaponStats from "./WeaponStats.vue";

const props = defineProps<{
    mainWeapon?: EnhancedWeapon;
    specialWeapon?: EnhancedWeapon;
    tool?: SentryTool;
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
</script>

<template>
    <div class="mb-5">
        <h5>Player Stats</h5>
        <template v-for="key of keys" :key="key">
            <template v-if="calculateWidth(key) !== 0">
                <div>
                    {{ key }}<span v-if="defaults[key] > 0">&nbsp;-&nbsp;{{ defaults[key] + (defaults[key] * computedPlayer[key]) }}</span><span v-if="calculateWidth(key) !== 0">&nbsp;(<span v-if="calculateWidth(key) > 0">&plus;</span>{{ (computedPlayer[key] * 100).toFixed(2) }}%)</span>
                </div>
                <div class="progress bg-dark" role="progressbar" style="height: 5px;">
                    <div v-if="calculateWidth(key) >= 0" class="progress-bar chart-bg" :style="`width: ${calculateWidth(key)}%`"></div>
                    <div v-else class="progress-bar chart-bg-danger" :style="`width: ${Math.abs(calculateWidth(key))}%`"></div>
                </div>
            </template>
        </template>
        <h5 class="mt-3">{{ mainWeapon ? mainWeapon.Type : 'Main Weapon' }}</h5>
        <weapon-stats v-if="mainWeapon"
                :weapon="mainWeapon"
                :damage-boost="computedPlayer['Main Damage']"
                :ammo-boost="computedPlayer['Main Ammo']"
                :maximums="mainMaximums"/>
        <h5 class="mt-3">{{ specialWeapon ? specialWeapon.Type : 'Special Weapon' }}</h5>
        <weapon-stats v-if="specialWeapon"
                      :weapon="specialWeapon"
                      :damage-boost="computedPlayer['Special Damage']"
                      :ammo-boost="computedPlayer['Special Ammo']"
                      :maximums="specialMaximums"/>
        <h5 class="mt-3">{{ meleeWeapon ? meleeWeapon.Type : 'Melee Weapon' }}</h5>
        <melee-stats v-if="meleeWeapon"
                     :weapon="meleeWeapon"
                     :damage-boost="computedPlayer['Melee Damage']"
                     :maximums="meleeMaximums"/>
    </div>
</template>

<style scoped>
.chart-bg {
    background-color: #1b537a;
}
.chart-bg-danger {
    background-color: #7C2D3E;
}
</style>
