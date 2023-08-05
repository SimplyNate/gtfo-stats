<script setup lang="ts">
import enemies from '../data/enemies';
</script>

<template>
    <div class="container-fluid border rounded" v-for="enemy of enemies" :key="enemy.Name">
        <div class="row">
            <div class="col">
                <h4>{{ enemy.Name }}</h4>
            </div>
            <div class="col">
                <div>Health: {{ enemy.Health }}</div>
                <div>Stagger HP: {{ enemy["Stagger HP"] }}</div>
            </div>
            <div class="col">
                <div class="row" v-for="weakPoint of Object.keys(enemy['Weak Points'])">
                    {{ weakPoint }}: {{ enemy['Weak Points'][weakPoint].Multiplier }}x
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
