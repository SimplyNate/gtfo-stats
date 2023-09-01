<script setup lang="ts">
import BarChart from './BarChart.vue';
import { ref, computed } from 'vue';
import { EnhancedWeapon } from '../data/weapons';

const props = defineProps<{
    weapons: EnhancedWeapon[]
}>();

const key = ref('damage');

const barData = computed(() => {
    const labels = [];
    const mainDataset: { label: string, data: number[] } = {
        label: `Main Weapon ${key.value}`,
        data: [],
    };
    const sortedWeapons = [ ...props.weapons ];
    sortedWeapons.sort((a, b) => {
        if (a[key.value]) {
            return b[key.value] - a[key.value];
        }
        return b.equipment[key.value] - a.equipment[key.value]
    });
    for (const mainWeapon of sortedWeapons) {
        labels.push(mainWeapon.Type);
        if (mainWeapon[key.value]) {
            mainDataset.data.push(Number(mainWeapon[key.value].toFixed(2)));
        }
        else {
            mainDataset.data.push(Number(mainWeapon.equipment[key.value].toFixed(2)));
        }
    }
    return {dataset: [mainDataset], labels};
});


</script>

<template>
    <div class="mt-1">
        <select class="custom-select rounded w-25" v-model="key">
            <option v-for="key of Object.keys(weapons[0].keys)" :key="key" :value="key">{{ weapons[0].keys[key] }}</option>
            <option v-for="key of weapons[0].equipmentKeys" :key="key" :value="key">{{ key }}</option>
        </select>
    </div>
    <bar-chart :datasets="barData.dataset" :labels="barData.labels" />
</template>

<style scoped>

</style>
