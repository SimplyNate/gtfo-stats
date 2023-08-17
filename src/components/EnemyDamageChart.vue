<script setup lang="ts">
import LineChart from './LineChart.vue';
import { Enemy } from '../data/enemies';
import { EnhancedWeapon } from '../data/weapons';
import {computed} from "vue";

const props = defineProps<{
    enemy: Enemy;
    weapon: EnhancedWeapon;
}>();

function numShots(health: number, damage: number) {
    return Math.ceil(health / damage)
}

function neededBoostForShots(health: number, baseDamage: number, target: number) {
    const healthPerShot = health / target;
    const boost = healthPerShot / baseDamage - 1;
    return Number((Math.max(0, boost) * 100).toFixed(2));
}

const datasets = computed(() => {
    const ds = [];
    const labels = [];
    const bodyData: {label: string; data: number[];} = {
        label: 'Body',
        data: [],
    };
    for (let i = numShots(props.enemy.Health, props.weapon.damage); i > 0; i--) {
        labels.push(i.toString());
        bodyData.data.push(neededBoostForShots(props.enemy.Health, props.weapon.damage, i));
    }
    ds.push(bodyData);
    for (const weakPoint of Object.keys(props.enemy["Weak Points"])) {
        const damage = props.weapon.precision * props.enemy["Weak Points"][weakPoint].Multiplier;
        const ns = numShots(props.enemy.Health, damage);
        const set: {label: string; data: number[];} = {
            label: weakPoint,
            data: [],
        };
        const diff = labels.length - ns;
        for (let i = 0; i < diff; i++) {
            set.data.push(Number.NaN);
        }
        for (let i = ns; i > 0; i--) {
            set.data.push(neededBoostForShots(props.enemy.Health, damage, i));
        }
        ds.push(set);
    }
    return {ds, labels};
});

</script>

<template>
    <line-chart v-if="props.enemy && props.weapon"
        :datasets="datasets.ds"
        :labels="datasets.labels"
        :title="`${enemy.Name} - Damage Chart`"/>
</template>

<style scoped>

</style>