<script setup lang="ts">
import { Enemy } from '../data/enemies';
import { mainWeapons, specialWeapons } from '../data/weapons';
import { computed } from 'vue';
import BarChart from './BarChart.vue';
import { totalKill } from '../computations';

const props = defineProps<{
    enemy: Enemy;
}>();

const weapons = computed(() => {
    return [...mainWeapons, ...specialWeapons];
});

interface Dataset {
    label: string; data: number[];
}

const barData = computed(() => {
    const labels: string[] = [];
    const dataset: Dataset = {
        label: 'Enemy Kills',
        data: [],
    };
    const health = props.enemy.Health;
    const data = [];
    for (const weapon of weapons.value) {
        data.push({label: weapon.Type, value: totalKill(health, weapon.damage, weapon.equipment['Max Ammo'])});
    }
    data.sort((a, b) => b.value - a.value);
    for (const datum of data) {
        dataset.data.push(datum.value);
        labels.push(datum.label);
    }
    return { datasets: [dataset], labels };
});
</script>

<template>
    <div>
        <select class="form-select w-50">
            <option>Body</option>
            <option v-for="weakPoint of Object.keys(enemy['Weak Points'])" :key="weakPoint">{{ weakPoint }}</option>
        </select>
    </div>
    <bar-chart :datasets="barData.datasets" :labels="barData.labels" />
</template>

<style scoped>

</style>