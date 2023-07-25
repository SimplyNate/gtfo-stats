<script setup lang="ts">
import { computed } from 'vue';
import { Booster } from '../data/boosters';
import {EnhancedWeapon, mainMaximums, mainMinimums, specialMaximums, specialMinimums} from '../data/weapons';
import { EnhancedMeleeWeapon } from '../data/melee';
import Weapon from "./Weapon.vue";
import MeleeWeapon from "./MeleeWeapon.vue";
import { SentryTool } from '../data/tool';

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
    'Hacking Speed': number;
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
    'Hacking Speed': 0,
    'Bioscan Speed': 0,
};

const computedPlayer = computed(() => {
    const player: Player =  {
        Health: 0.50,
        'Regen Cap': 0.75,
        'Regen Speed': 0.80,
        'Melee Resistance': 0.25,
        'Projectile Resistance': 0.30,
        'Infection Resistance': 0.40,
        'Revive Speed': 0.10,
        'Med Efficiency': 0.01,
        'Supply Efficiency': 0.05,
        'Main Ammo': -0.2,
        'Special Ammo': -0.5,
        'Tool Ammo': 0,
        'Melee Damage': 0.90,
        'Main Damage': 0.25,
        'Special Damage': 0.35,
        'C-Foam Portion': 0,
        'Sentry CPU Speed': 0,
        'Sentry Damage': 0,
        'SR Sentry Damage': 0,
        'Trip Mine Damage': 0,
        'Glow Stick Power': 0,
        'Fog Repeller Power': 0,
        'Tracker CPU Speed': 0,
        'Hacking Speed': 0,
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
    <div>
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
        <h5 class="mt-3">Main Weapon</h5>
        <weapon v-if="mainWeapon"
                :weapon-values="mainWeapon"
                :minimum-values="mainMinimums"
                :total-values="mainMaximums"
                :mini="true"/>
        <h5 class="mt-3">Special Weapon</h5>
        <weapon v-if="specialWeapon"
                :weapon-values="specialWeapon"
                :minimum-values="specialMinimums"
                :total-values="specialMaximums"
                :mini="true"/>
        <h5 class="mt-3">Melee Weapon</h5>
        <melee-weapon v-if="meleeWeapon" :melee-weapon="meleeWeapon"/>
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
