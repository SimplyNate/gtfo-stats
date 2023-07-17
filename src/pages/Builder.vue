<script setup lang="ts">
import WeaponSelection from '../components/WeaponSelection.vue';
</script>

<template>
    <div class="fullscreen">
        <div class="container">
            <div class="row fw-bold">
                WEAPONS
            </div>
            <div class="row">
                <div class="col">
                    <weapon-selection class="clickable"/>
                </div>
                <div class="col">
                    <weapon-selection class="clickable"/>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col">
                    <weapon-selection class="clickable"/>
                </div>
                <div class="col">
                    <weapon-selection class="clickable"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.clickable {
    cursor: pointer;
}
</style>