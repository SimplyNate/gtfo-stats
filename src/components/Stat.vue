<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    title: string;
    originalValue: number;
    newValue: number;
    maxValue: number;
    percentage?: number;
}>();

const delta = computed(() => {
    return props.newValue - props.originalValue;
});
const computedOriginalValue = computed(() => {
    if (delta.value > 0) {
        return props.originalValue;
    }
    return props.originalValue + delta.value;
});
</script>

<template>
    <div>
        <div>
            {{ title }} - {{ newValue ? newValue.toFixed(2) : originalValue.toFixed(2) }}<span v-if="delta !== 0">&nbsp;(<span v-if="delta > 0">&plus;</span>{{ (delta).toFixed(2) }})</span>
            <span v-if="title === 'Ammo Per Refill' && percentage">&nbsp;({{ (percentage * 100).toFixed(2) }}%)</span>
        </div>
        <div class="progress bg-dark" role="progressbar" style="height: 5px;">
            <div class="progress-bar chart-bg" :style="`width: ${computedOriginalValue / maxValue * 100}%`"></div>
            <div v-if="delta > 0" class="progress-bar chart-bg-best" :style="`width: ${delta / maxValue * 100}%`"></div>
            <div v-else class="progress-bar chart-bg-danger" :style="`width: ${Math.abs(delta / maxValue * 100)}%`"></div>
        </div>
    </div>
</template>

<style scoped>
</style>
