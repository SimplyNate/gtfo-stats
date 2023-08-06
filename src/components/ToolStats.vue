<script setup lang="ts">
import {EnhancedTool} from '../data/tool';

defineProps<{
    tool: EnhancedTool;
}>();
</script>

<template>
    <div class="p-2 clickable rounded">
        <h5 class="fw-bold">{{ tool.Type }}</h5>
    </div>
</template>

<style scoped>

</style>