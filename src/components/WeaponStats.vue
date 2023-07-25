<script setup lang="ts">
import type { EnhancedWeapon } from '../data/weapons';
import enemies, { Enemy } from '../data/enemies';
import { onMounted, ref } from 'vue';

const props = defineProps<{
    weaponValues: EnhancedWeapon,
    totalValues: EnhancedWeapon,
    minimumValues: EnhancedWeapon,
}>();
const weapon = props.weaponValues;

const showMore = ref<boolean>(false);


</script>

<template>
    <div>
        <div>Damage</div>
        <div class="progress bg-dark" role="progressbar" style="height: 5px;">

        </div>
    </div>
</template>

<style scoped>

</style>