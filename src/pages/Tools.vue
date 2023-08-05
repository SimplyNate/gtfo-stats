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
    <div class="container-fluid border rounded text-center p-3 clickable" v-for="tool of combinedTools" :key="tool.name">
        <div class="row">
            <div class="col-3">
                <h3>{{ tool.Type }}</h3>
                <h4>{{ tool.Name }}</h4>
            </div>
            <div class="col-9">
                <div class="row" v-for="key of Object.keys(tool.tool)" :key="key">
                    <div class="col-6 text-end">{{ key }}</div>
                    <div class="col-6 text-start">{{ tool.tool[key] }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
