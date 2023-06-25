<template>
    <div class="container-fluid border rounded text-center">
        <div class="row">
            <div class="col">
                <h1>{{ weapon.Type }}</h1>
                <h2>{{ weapon.Name }}</h2>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Weapon } from '../data/mainWeapons';

const props = defineProps({
    weaponValues: Object,
});
const weapon: Weapon = <Weapon>props.weaponValues;

</script>

<style scoped>

</style>
