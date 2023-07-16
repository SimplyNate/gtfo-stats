<script setup lang="ts">
import WeaponSelection from '../components/WeaponSelection.vue';
</script>

<template>
    <div>
        <div class="container">
            <div class="row fw-bold">
                WEAPONS
            </div>
            <div class="row">
                <div class="col">
                    <weapon-selection/>
                </div>
                <div class="col">
                    <weapon-selection/>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col">
                    <weapon-selection/>
                </div>
                <div class="col">
                    <weapon-selection/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>