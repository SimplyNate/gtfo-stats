<script setup lang="ts">
import { meleeMaximums, EnhancedMeleeWeapon } from '../data/melee';
import enemies from '../data/enemies';
import { ref, onMounted } from 'vue';
import Stat from './Stat.vue';
import EnemyTargetStat from './EnemyTargetStat.vue';

const props = defineProps<{
    meleeWeapon: EnhancedMeleeWeapon;
}>();

const melee = props.meleeWeapon;

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
    const progressBars = document.querySelectorAll('.progress-bar');
    for (const elem of progressBars) {
        const name = <string>elem.getAttribute('name');
        const value = Number((<HTMLElement>elem).style.width.replace('%', ''));
        if (value >= 100) {
            if (name !== 'Charge Time') {
                elem.setAttribute('class', 'progress-bar chart-bg-best');
            }
        }
        else if (name === 'Charge Time' && elem.innerHTML === '0.5') {
            elem.setAttribute('class', 'progress-bar chart-bg-best');
        }
    }
});

</script>

<template>
    <div class="container-fluid border rounded text-center p-3 clickable" @click="toggleMore">
        <div class="row">
            <div class="col-3">
                <h3>{{ melee.Type }}</h3>
                <h4>{{ melee.Name }}</h4>
            </div>
            <div class="col-9 text-start">
                <stat title="Uncharged Damage" :new-value="melee.damage.Uncharged" :max-value="meleeMaximums.damage.Uncharged" :original-value="melee.damage.Uncharged"/>
                <stat title="Charged Damage" :new-value="melee.damage.Charged" :max-value="meleeMaximums.damage.Charged" :original-value="melee.damage.Charged"/>
                <stat title="Charged Precision" :new-value="melee.precision.Charged" :max-value="meleeMaximums.precision.Charged" :original-value="melee.precision.Charged"/>
                <stat title="Charged Stagger" :new-value="melee.stagger.Charged" :max-value="meleeMaximums.stagger.Charged" :original-value="melee.stagger.Charged"/>
                <stat title="Range" :new-value="melee.equipment.Range" :max-value="meleeMaximums.equipment.Range" :original-value="melee.equipment.Range"/>
                <stat title="Charge Time" :new-value="melee.equipment['Charge Time']" :max-value="meleeMaximums.equipment['Charge Time']" :original-value="melee.equipment['Charge Time']"/>
                <stat title="Charge Hold Duration" :new-value="melee.equipment['Charge Hold Duration']" :max-value="meleeMaximums.equipment['Charge Hold Duration']" :original-value="melee.equipment['Charge Hold Duration']"/>
                <stat title="Charged DPS" :new-value="melee.dps.Charged" :max-value="meleeMaximums.dps.Charged" :original-value="melee.dps.Charged"/>
                <stat title="Stagger DPS" :new-value="melee.staggerDPS.Charged" :max-value="meleeMaximums.staggerDPS.Charged" :original-value="melee.staggerDPS.Charged"/>
                <template v-if="showMore">
                    <div class="row mt-3" v-for="enemy of enemies" :key="enemy.Name">
                        <enemy-target-stat :enemy="enemy" :melee="melee"/>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
