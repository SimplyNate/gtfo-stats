<script setup lang="ts">
import tools from '../data/tool';

const combinedTools = [
    ...tools.sentries,
    tools.bioTracker,
    tools.cFoamLauncher,
    tools.mineDeployer,
];
</script>

<template>
    <div class="container-fluid border rounded text-center p-3 clickable" v-for="tool of combinedTools" :key="tool.Name">
        <div class="row">
            <div class="col-3">
                <h3>{{ tool.Type }}</h3>
                <h4>{{ tool.Name }}</h4>
                <img :src="tool.equipment.Image" :alt="tool.Type">
            </div>
            <div class="col-9">
                <template  v-for="key of Object.keys(tool.equipment)" :key="key">
                    <div class="row" v-if="key !== 'Image'">
                        <div class="col-6 text-end">{{ key }}</div>
                        <div class="col-6 text-start">{{ tool.equipment[key] }}</div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
