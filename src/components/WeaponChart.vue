<script setup lang="ts">
import BarChart from './BarChart.vue';
import { ref, computed } from 'vue';
import { EnhancedWeapon } from '../data/weapons';

const props = defineProps<{
    weapons: EnhancedWeapon[]
}>();

const validKeys: string[] = [];
for (const key of Object.keys(props.weapons[0].weapon)) {
    if (Number.isFinite(props.weapons[0].weapon[key])) {
        validKeys.push(key);
    }
}
const key = ref('Damage');

const barData = computed(() => {
    const labels = [];
    const mainDataset: { label: string, data: number[] } = {
        label: `Main Weapon ${key.value}`,
        data: [],
    };
    const sortedWeapons = [ ...props.weapons ];
    sortedWeapons.sort((a, b) => <number>b.weapon[key.value] - <number>a.weapon[key.value]);
    for (const mainWeapon of sortedWeapons) {
        labels.push(mainWeapon.Type);
        // @ts-ignore
        mainDataset.data.push(Number(mainWeapon.weapon[key.value].toFixed(2)));
    }
    return {dataset: [mainDataset], labels};
});


</script>

<template>
    <div class="container">
        <select class="form-select" v-model="key">
            <option v-for="key of validKeys" :key="key">{{ key }}</option>
        </select>
    </div>
    <bar-chart :datasets="barData.dataset" :labels="barData.labels" />
</template>

<style scoped>

</style>
