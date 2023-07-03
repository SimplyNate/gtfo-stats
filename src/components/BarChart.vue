<script setup lang="ts">
import { onMounted, computed } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps({
    datasets: Array,
});

const baseDataset = {
    borderWidth: 1,
}
// @ts-ignore
const ds = computed(() => {
    const vals = [];
    // @ts-ignore
    for (const dataset of props.datasets) {
        vals.push({
            // @ts-ignore
            ...dataset,
            ...baseDataset,
        })
    }
    console.log(vals);
    return vals;
});

onMounted(() => {
    const ctx = <HTMLCanvasElement>document.getElementById('mainChart');
    new Chart(ctx, {
        type: 'bar',
        data: {
            // @ts-ignore
            datasets: ds.value,
        },
        options: {
          indexAxis: 'y',
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
});
</script>

<template>
    <canvas id="mainChart"></canvas>
</template>

<style scoped>

</style>
