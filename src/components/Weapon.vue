<template>
    <div :id="`${weapon.weapon.Name}`" class="container-fluid border rounded text-center p-3 clickable" @click="toggleMore">
        <div class="row">
            <div class="col-3">
                <h3>{{ weapon.weapon.Type }}</h3>
                <h4>{{ weapon.weapon.Name }}</h4>
            </div>
            <div class="col-9 text-start">
                <stat title="Damage" :original-value="weapon.weapon.Damage" :new-value="weapon.weapon.Damage" :max-value="totalValues.Damage"/>
                <stat title="DPS" :original-value="weapon.dps" :new-value="weapon.dps" :max-value="totalValues.DPS"/>
                <stat title="Effective DPS" :original-value="weapon.effectiveDPS" :new-value="weapon.effectiveDPS" :max-value="totalValues['Effective DPS']"/>
                <stat title="Damage Per Mag" :original-value="weapon.damagePerMag" :new-value="weapon.damagePerMag" :max-value="totalValues['Damage Per Mag']"/>
                <stat title="Total Damage" :original-value="weapon.totalDamage" :new-value="weapon.totalDamage" :max-value="totalValues['Total Damage']"/>
                <stat title="Precision" :original-value="weapon.precision" :new-value="weapon.precision" :max-value="totalValues['Precision Damage']"/>
                <stat title="Stagger" :original-value="weapon.stagger" :new-value="weapon.stagger" :max-value="totalValues['Stagger Damage']"/>
                <stat title="Reload Time" :original-value="weapon.weapon['Reload Time (s)']" :new-value="weapon.weapon['Reload Time (s)']" :max-value="totalValues['Reload Time (s)']"/>
                <stat title="Range" :original-value="weapon.weapon['Range (m)']" :new-value="weapon.weapon['Range (m)']" :max-value="totalValues['Range (m)']"/>
                <stat title="Magazine Size" :original-value="weapon.weapon['Magazine Size']" :new-value="weapon.weapon['Magazine Size']" :max-value="totalValues['Magazine Size']"/>
                <stat title="Max Ammo" :original-value="weapon.weapon['Max Ammo']" :new-value="weapon.weapon['Max Ammo']" :max-value="totalValues['Max Ammo']"/>
                <stat title="Starting Ammo" :original-value="weapon.weapon['Starting Ammo']" :new-value="weapon.weapon['Starting Ammo']" :max-value="totalValues['Starting Ammo']"/>
                <stat title="Rate of Fire" :original-value="weapon.weapon['Rate of Fire']" :new-value="weapon.weapon['Rate of Fire']" :max-value="totalValues['Rate of Fire']"/>
                <template v-if="showMore">
                    <div class="row mt-3" v-for="enemy of enemies" :key="enemy.Name">
                        <enemy-target-stat :weapon="weapon" :enemy="enemy"/>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { EnhancedWeapon, MinMax } from '../data/weapons';
import enemies from '../data/enemies';
import Stat from './Stat.vue';
import EnemyTargetStat from './EnemyTargetStat.vue';
import { onMounted, ref } from 'vue';

const props = defineProps<{
    weaponValues: EnhancedWeapon,
    totalValues: MinMax,
    minimumValues: MinMax,
    mini?: boolean,
}>();
const weapon = props.weaponValues;

const showMore = ref<boolean>(false);

function toggleMore() {
    showMore.value = !showMore.value;
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
    const parent: HTMLElement = document.getElementById(props.weaponValues.weapon.Name)!;
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

