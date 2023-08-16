<script setup lang="ts">
import { onMounted, watch } from 'vue';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Chart from 'chart.js/auto';

Chart.register(ChartDataLabels);
Chart.defaults.color = '#d3f7ff';

const props = defineProps<{
    datasets: any[];
    labels: any[];
    title: string;
}>();

let chart: Chart;

onMounted(() => {
    const ctx = <HTMLCanvasElement>document.getElementById(props.title + 'lineChart');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: props.labels,
            datasets: props.datasets,
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
            },
        },
    });
});

watch(props, () => {
    chart.data.labels = props.labels;
    chart.data.datasets = props.datasets;
    chart.update();
});

</script>

<template>
    <canvas :id="title + 'lineChart'"></canvas>
</template>

<style scoped>

</style>