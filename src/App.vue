<template>
    <div class="text-center">
        <div class="container">
            <div class="row">
                <div class="col">
                    <h1>Enemies</h1>
                    <ul>
                        <li v-for="item of enemies" :key="item.Name">{{ item.Name }}</li>
                    </ul>
                </div>
                <div class="col">
                    <h1>Main</h1>
                    <ul>
                        <li v-for="item of main" :key="item.Name">{{ item.Name }}</li>
                    </ul>
                </div>
                <div class="col">
                    <h1>Special</h1>
                    <ul>
                        <li v-for="item of special" :key="item.Name">{{ item.Name }}</li>
                    </ul>
                </div>
                <div class="col">
                    <h1>Melee</h1>
                    <ul>
                        <li v-for="item of melee" :key="item.Name">{{ item.Name }}</li>
                    </ul>
                </div>
                <div class="col">
                    <h1>Tool</h1>
                    <ul>
                        <li v-for="item of tool" :key="item.Name">{{ item.Name }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import enemies from './data/enemies.json';
import main from './data/main.json';
import melee from './data/melee.json';
import special from './data/special.json';
import tool from './data/tool.json';

</script>

<style scoped>

</style>
