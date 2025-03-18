<template>
    <div :id="`${weapon.Name}`" class="container-fluid border-top border-bottom border-start border-end rounded text-center p-3 clickable" @click="toggleMore">
        <div class="row">
            <div class="col-3">
                <h3>{{ weapon.Type }}</h3>
                <h4>{{ weapon.Name }}</h4>
                <img :src="weapon.equipment.Image" :alt="weapon.Name">
            </div>
            <div class="col-9 text-start">
                <stat v-for="key of Object.keys(weapon.keys)" :title="weapon.keys[key]" :original-value="weapon[key]" :new-value="weapon[key]" :max-value="totalValues[key]"/>
                <stat v-for="key of weapon.equipmentKeys" :title="key" :original-value="weapon.equipment[key]" :new-value="weapon.equipment[key]" :max-value="totalValues[key]"/>
            </div>
        </div>
    </div>
    <div class="container-fluid border-start border-end border-bottom rounded p-3" v-if="showMore">
        <div class="row mt-3">
            <div class="d-flex justify-content-between">
                <select class="custom-select rounded w-25" v-model="selectedEnemy">
                    <option v-for="enemy of enemies" :key="enemy.Name" :value="enemy">{{ enemy.Name }}</option>
                </select>
                <div class="menu-button m-0 font-main ps-3 pe-3 clickable" @click="toggleMore">CLOSE</div>
            </div>
            <enemy-target-stat :weapon="weapon" :enemy="selectedEnemy"/>
            <enemy-damage-chart v-if="selectedEnemy.Name !== 'Immortal' && selectedEnemy.Name !== 'Kraken'" :weapon="weapon" :enemy="selectedEnemy"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { EnhancedWeapon, MinMax } from '../data/weapons';
import enemies, { Enemy } from '../data/enemies';
import Stat from './Stat.vue';
import EnemyTargetStat from './EnemyTargetStat.vue';
import EnemyDamageChart from './EnemyDamageChart.vue';
import { onMounted, ref } from 'vue';

const props = defineProps<{
    weaponValues: EnhancedWeapon,
    totalValues: MinMax,
    minimumValues: MinMax,
    mini?: boolean,
}>();
const weapon = props.weaponValues;

const showMore = ref<boolean>(false);

const selectedEnemy = ref<Enemy>(enemies[0]);

function toggleMore() {
    showMore.value = !showMore.value;
    const weaponDiv = <HTMLElement>document.getElementById(weapon.Name);
    if (showMore.value) {
        weaponDiv.classList.remove('border-bottom');
    }
    else {
        weaponDiv.classList.add('border-bottom');
    }
    setTimeout(() => {
        const progressBars = document.querySelectorAll('.enemy-bar');
        for (const elem of progressBars) {
            if (Number((<HTMLElement>elem).style.width.replace('%', '')) >= 100) {
                elem.setAttribute('class', 'progress-bar chart-bg-best');
            }
        }
    }, 1);
}

onMounted(() => {
    const parent: HTMLElement = document.getElementById(props.weaponValues.Name)!;
    const progressBars = parent.querySelectorAll('.progress-bar');
    for (const elem of progressBars) {
        const name = <string>elem.getAttribute('name');
        const currentValue = Number((<HTMLElement>elem).innerHTML);
        if (Number((<HTMLElement>elem).style.width.replace('%', '')) >= 100) {
            if (name === 'Reload Time (s)') {
                elem.setAttribute('class', 'progress-bar chart-bg-danger');
            }
            else {
                elem.setAttribute('class', 'progress-bar chart-bg-best');
            }
        }
        else if (props.minimumValues[name]) {
            if (currentValue.toFixed(2) === (<number>props.minimumValues[name]).toFixed(2)) {
                if (name === 'Reload Time (s)') {
                    elem.setAttribute('class', 'progress-bar chart-bg-best');
                }
                else {
                    elem.setAttribute('class', 'progress-bar chart-bg-danger');
                }
            }
        }
    }
});

</script>

