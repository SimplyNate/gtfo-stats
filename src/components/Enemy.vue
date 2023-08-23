<script setup lang="ts">
import EnemyKillChart from './EnemyKillChart.vue';
import { Enemy} from '../data/enemies';
import { ref } from 'vue';

defineProps<{
    enemy: Enemy;
}>();

const showMore = ref<boolean>(false);

function toggleChart() {
    showMore.value = !showMore.value;
}
</script>

<template>
    <div class="container-fluid border rounded clickable" @click="toggleChart">
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
            <div v-if="showMore">
                <enemy-kill-chart :enemy="enemy"/>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>