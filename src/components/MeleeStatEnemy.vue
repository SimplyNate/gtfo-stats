<script setup lang="ts">

defineProps<{
    target: string;
    damagePercent: number;
    toKill: number;
    boosterNeeded: number;
}>();

</script>

<template>
    <div>
        <div class="row text-start">
            <div class="col">{{ target }}: {{ damagePercent.toFixed(2) }}%</div>
            <div class="col">To Kill: {{ toKill }}</div>
            <div class="col">To 1-Shot: {{ boosterNeeded.toFixed(2) }}%</div>
        </div>
        <div class="progress bg-dark" role="progressbar" style="height: 5px;">
            <div v-if="damagePercent >= 100" class="progress-bar chart-bg-best" :style="`width: ${damagePercent}%`"></div>
            <div v-else class="progress-bar chart-bg" :style="`width: ${damagePercent}%`"></div>
        </div>
    </div>
</template>

<style scoped>
</style>
