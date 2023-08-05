<script setup lang="ts">
import tools from '../data/tool';

const headers = Object.keys(tools.sentries[0]);
</script>

<template>
    <table class="table table-dark">
        <thead>
        <tr>
            <th v-for="header of headers" :key="header">{{ header }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="tool of tools.sentries" :key="tool.name">
            <td v-for="header of headers" :key="header">{{ tool[header] }}</td>
        </tr>
        </tbody>
    </table>
</template>

<style scoped>

</style>
