<script setup lang="ts">
import BarChart from '../components/BarChart.vue';
import mainWeapons from '../data/mainWeapons';
import { ref, computed } from 'vue';

const validKeys = [
    'Damage',
    'Max Ammo',
    'Magazine Size',
    'Precision Damage',
    'Stagger Multiplier',
    'Damage Per Mag',
    'Precision Per Mag',
    'Headshot Damage',
    'Reload Time (s)',
    'Range (m)',
    'Rate of Fire',
    'Total Damage',
    'DPS',
    'Effective DPS',
    'Precision DPS',
    'Effective Precision DPS',
];
const key = ref('Damage');

const barData = computed(() => {
    const labels = [];
    const mainDataset = {
        label: `Main Weapon ${key.value}`,
        data: [],
    };
    const sortedWeapons = [ ...mainWeapons ];
    sortedWeapons.sort((a, b) => <number>b[key.value] - <number>a[key.value]);
    for (const mainWeapon of sortedWeapons) {
        labels.push(mainWeapon.Type);
        // @ts-ignore
        mainDataset.data.push(mainWeapon[key.value]);
    }
    return {dataset: [mainDataset], labels};
});


</script>

<template>
    <div class="container">
        <select class="form-select" v-model="key">
            <option v-for="key of validKeys" :key="key">{{ key }}</option>
        </select>
    </div>
    <bar-chart :datasets="barData.dataset" :labels="barData.labels" />
</template>

<style scoped>

</style>
