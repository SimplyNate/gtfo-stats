<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    title: string;
    originalValue: number;
    newValue?: number;
}>();

const delta = computed(() => {
    if (props.newValue) {
        return props.newValue - props.originalValue;
    }
    return 0;
});
const computedOriginalValue = computed(() => {
    if (delta.value > 0) {
        return props.originalValue;
    }
    return props.originalValue - delta.value;
});
</script>

<template>
    <div>
        <div>
            {{ title }} - {{ newValue ? newValue : computedOriginalValue }}<span v-if="delta !== 0">&nbsp;(<span v-if="delta > 0">&plus;</span>{{ (delta * 100).toFixed(2) }}%)</span>
        </div>
        <div class="progress bg-dark" role="progressbar" style="height: 5px;">
            <div class="progress-bar chart-bg" :style="`width: ${computedOriginalValue}%`"></div>
            <template v-if="newValue">
                <div v-if="newValue > 0" class="progress-bar chart-bg-best" :style="`width: ${delta}%`"></div>
                <div v-else class="progress-bar chart-bg-danger" :style="`width: ${delta}%`"></div>
            </template>
        </div>
    </div>
</template>

<style scoped>
.chart-bg {
    background-color: #1b537a;
}
.chart-bg-danger {
    background-color: #7C2D3E;
}
.chart-bg-best {
    background-color: #257a1b;
}
</style>