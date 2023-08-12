<script setup lang="ts">

import {Enemy} from '../data/enemies';
import {EnhancedWeapon} from '../data/weapons';
import {computed} from 'vue';
import {EnhancedMeleeWeapon} from '../data/melee';

const props = defineProps<{
    enemy: Enemy;
    weapon?: EnhancedWeapon;
    melee?: EnhancedMeleeWeapon;
    damageBoost?: number;
}>();

const currentBoost = computed(() => {
    return props.damageBoost ? props.damageBoost : 0;
});

function neededBoost(baseDamage: number, enemyHealth: number) {
    // boost = (enemyHealth / damage) - 1
    return Math.max(0, (enemyHealth / baseDamage) - 1 - currentBoost.value) * 100;
}

function toKill(health: number, damage: number): number {
    return Math.ceil(health / damage)
}

function damagePercent(health: number, damage: number): number {
    return damage / health * 100;
}

function waste(health: number, damage: number): number {
    return (((Math.ceil(health / damage) * damage) - health) / damage * 100)
}

</script>

<template>
    <div v-if="weapon" class="row">
        <div class="fw-bold">{{ enemy.Name }}</div>
        <div>
            <div class="row">
                <div class="col">Body: {{ damagePercent(enemy.Health, weapon.damage).toFixed(2) }}%</div>
                <div class="col">To Kill: {{ toKill(enemy.Health, weapon.damage) }}</div>
                <div class="col">To 1-Shot: {{ neededBoost(weapon.weapon.Damage, enemy.Health).toFixed(2) }}%</div>
                <div class="col">Waste: {{ waste(enemy.Health, weapon.damage).toFixed(2) }}%</div>
            </div>
            <div class="progress bg-dark" role="progressbar" style="height: 5px;">
                <div v-if="damagePercent(enemy.Health, weapon.damage) >= 100" class="progress-bar chart-bg-best ps-0" :style="`width: ${damagePercent(enemy.Health, weapon.damage)}%`"></div>
                <div v-else class="progress-bar chart-bg ps-0" :style="`width: ${damagePercent(enemy.Health, weapon.damage)}%`"></div>
            </div>
        </div>
        <div v-for="weakPoint of Object.keys(enemy['Weak Points'])" :key="weakPoint">
            <div class="row">
                <div class="col">{{ weakPoint }}: {{ damagePercent(enemy.Health, weapon.precision * enemy["Weak Points"][weakPoint].Multiplier).toFixed(2) }}%</div>
                <div class="col">To Kill: {{ toKill(enemy.Health, weapon.precision * enemy["Weak Points"][weakPoint].Multiplier) }}</div>
                <div class="col">To 1-Shot: {{ neededBoost(weapon.weapon['Precision Damage'] * enemy["Weak Points"][weakPoint].Multiplier, enemy.Health).toFixed(2) }}%</div>
                <div class="col">Waste: {{ waste(enemy.Health, weapon.precision * enemy["Weak Points"][weakPoint].Multiplier).toFixed(2) }}%</div>
            </div>
            <div class="progress bg-dark" role="progressbar" style="height: 5px;">
                <div v-if="damagePercent(enemy.Health, weapon.precision * enemy['Weak Points'][weakPoint].Multiplier) >= 100" class="progress-bar chart-bg-best" :style="`width: ${damagePercent(enemy.Health, weapon.precision * enemy['Weak Points'][weakPoint].Multiplier)}%`"></div>
                <div v-else class="progress-bar chart-bg" :style="`width: ${damagePercent(enemy.Health, weapon.precision * enemy['Weak Points'][weakPoint].Multiplier)}%`"></div>
            </div>
        </div>
    </div>
    <div v-else-if="melee" class="row">
        <div v-if="melee.Type === 'Knife' && !enemy.Name.includes('Scout')">
            <div class="fw-bold">{{ enemy.Name }} - Stealth</div>
            <div>
                <div class="row">
                    <div class="col">Body: {{ damagePercent(enemy.Health, melee.stealth.Charged).toFixed(2) }}%</div>
                    <div class="col">To Kill: {{ toKill(enemy.Health, melee.stealth.Charged) }}</div>
                    <div class="col">To 1-Shot: {{ neededBoost(melee.equipment.Damage.Charged * melee.equipment["Stealth Multiplier"].Charged, enemy.Health).toFixed(2) }}%</div>
                </div>
                <div class="progress bg-dark" role="progressbar" style="height: 5px;">
                    <div v-if="damagePercent(enemy.Health, melee.stealth.Charged) >= 100" class="progress-bar chart-bg-best ps-0" :style="`width: ${damagePercent(enemy.Health, melee.stealth.Charged)}%`"></div>
                    <div v-else class="progress-bar chart-bg ps-0" :style="`width: ${damagePercent(enemy.Health, melee.stealth.Charged)}%`"></div>
                </div>
            </div>
            <div v-for="weakPoint of Object.keys(enemy['Weak Points'])" :key="weakPoint">
                <div class="row">
                    <div class="col">{{ weakPoint }}: {{ damagePercent(enemy.Health, melee.stealthPrecision.Charged * enemy["Weak Points"][weakPoint].Multiplier).toFixed(2) }}%</div>
                    <div class="col">To Kill: {{ toKill(enemy.Health, melee.stealthPrecision.Charged * enemy["Weak Points"][weakPoint].Multiplier) }}</div>
                    <div class="col">To 1-Shot: {{ neededBoost(melee.equipment.Damage.Charged * melee.equipment['Stealth Multiplier'].Charged * melee.equipment['Precision Multiplier'].Charged * enemy["Weak Points"][weakPoint].Multiplier, enemy.Health).toFixed(2) }}%</div>
                </div>
                <div class="progress bg-dark" role="progressbar" style="height: 5px;">
                    <div v-if="damagePercent(enemy.Health, melee.stealthPrecision.Charged * enemy['Weak Points'][weakPoint].Multiplier) >= 100" class="progress-bar chart-bg-best" :style="`width: ${damagePercent(enemy.Health, melee.stealthPrecision.Charged * enemy['Weak Points'][weakPoint].Multiplier)}%`"></div>
                    <div v-else class="progress-bar chart-bg" :style="`width: ${damagePercent(enemy.Health, melee.stealthPrecision.Charged * enemy['Weak Points'][weakPoint].Multiplier)}%`"></div>
                </div>
            </div>
        </div>
        <div class="fw-bold">{{ enemy.Name }}</div>
        <div>
            <div class="row">
                <div class="col">Body: {{ damagePercent(enemy.Health, melee.damage.Charged).toFixed(2) }}%</div>
                <div class="col">To Kill: {{ toKill(enemy.Health, melee.damage.Charged) }}</div>
                <div class="col">To 1-Shot: {{ neededBoost(melee.equipment.Damage.Charged, enemy.Health).toFixed(2) }}%</div>
            </div>
            <div class="progress bg-dark" role="progressbar" style="height: 5px;">
                <div v-if="damagePercent(enemy.Health, melee.damage.Charged) >= 100" class="progress-bar chart-bg-best ps-0" :style="`width: ${damagePercent(enemy.Health, melee.damage.Charged)}%`"></div>
                <div v-else class="progress-bar chart-bg ps-0" :style="`width: ${damagePercent(enemy.Health, melee.damage.Charged)}%`"></div>
            </div>
        </div>
        <div v-for="weakPoint of Object.keys(enemy['Weak Points'])" :key="weakPoint">
            <div class="row">
                <div class="col">{{ weakPoint }}: {{ damagePercent(enemy.Health, melee.precision.Charged * enemy["Weak Points"][weakPoint].Multiplier).toFixed(2) }}%</div>
                <div class="col">To Kill: {{ toKill(enemy.Health, melee.precision.Charged * enemy["Weak Points"][weakPoint].Multiplier) }}</div>
                <div class="col">To 1-Shot: {{ neededBoost(melee.equipment.Damage.Charged * melee.equipment['Precision Multiplier'].Charged * enemy["Weak Points"][weakPoint].Multiplier, enemy.Health).toFixed(2) }}%</div>
            </div>
            <div class="progress bg-dark" role="progressbar" style="height: 5px;">
                <div v-if="damagePercent(enemy.Health, melee.precision.Charged * enemy['Weak Points'][weakPoint].Multiplier) >= 100" class="progress-bar chart-bg-best" :style="`width: ${damagePercent(enemy.Health, melee.precision.Charged * enemy['Weak Points'][weakPoint].Multiplier)}%`"></div>
                <div v-else class="progress-bar chart-bg" :style="`width: ${damagePercent(enemy.Health, melee.precision.Charged * enemy['Weak Points'][weakPoint].Multiplier)}%`"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
