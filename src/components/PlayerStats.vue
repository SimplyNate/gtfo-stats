<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    mainWeapon: any;
    specialWeapon: any;
    tool: any;
    meleeWeapon: any;
    mutedBooster: any;
    boldBooster: any;
    aggressiveBooster: any;
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
const player: Player =  {
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

});

const keys = Object.keys(player);

function calculateWidth(key: string) {
    return player[key] * 100;
}
</script>

<template>
    <div>
        <template v-for="key of keys" :key="key">
            <div>{{ key }}</div>
            <div class="progress" role="progressbar" style="height: 5px;">
                <div class="progress-bar" :style="`width: ${calculateWidth(key)}%`"></div>
            </div>
        </template>
    </div>
</template>

<style scoped>

</style>
