<script setup lang="ts">
import { onMounted, computed, watch } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps({
    datasets: Array,
    labels: Array,
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

let chart: Chart;

onMounted(() => {
    const ctx = <HTMLCanvasElement>document.getElementById('mainChart');
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: props.labels,
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
watch(props, () => {
    chart.data.labels = props.labels;
    // @ts-ignore
    chart.data.datasets = props.datasets;
    chart.update();
});
</script>

<template>
    <canvas id="mainChart"></canvas>
</template>

<style scoped>

</style>
