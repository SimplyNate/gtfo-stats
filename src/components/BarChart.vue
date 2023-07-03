<script setup lang="ts">
import { onMounted, computed, watch } from 'vue';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Chart from 'chart.js/auto';

Chart.register(ChartDataLabels);
Chart.defaults.color = '#d3f7ff';

const props = defineProps({
    datasets: Array,
    labels: Array,
});

const baseDataset = {
    borderWidth: 0,
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
            plugins: {
                datalabels: {
                    color: '#d3f7ff',
                    anchor: 'end',
                    align: 'start',
                }
            }
        },
        plugins: [ChartDataLabels],
    });
});
watch(props, () => {
    chart.data.labels = props.labels;
    // @ts-ignore
    chart.data.datasets = ds.value;
    chart.update();
});
</script>

<template>
    <canvas id="mainChart"></canvas>
</template>

<style scoped>

</style>
