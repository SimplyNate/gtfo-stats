<script setup lang="ts">
import BarChart from '../components/BarChart.vue';
import mainWeapons from '../data/mainWeapons';
import special from '../data/special';
import { ref } from 'vue';

const mainDataset = {
    label: 'Main',
    data: [],
};
const specialDataset = {
    label: 'Special',
    data: [],
};
for (const mainWeapon of mainWeapons) {
    mainDataset.data.push({
        x: mainWeapon.Type,
        y: mainWeapon.Damage,
    });
}
for (const spec of special) {
    specialDataset.data.push({
        x: spec.Type,
        y: spec.Damage,
    });
}

const datasets = ref([
    mainDataset,
    specialDataset,
]);

</script>

<template>
    <bar-chart :datasets="datasets" />
</template>

<style scoped>

</style>
