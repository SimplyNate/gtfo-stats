<script setup lang="ts">
import meleeWeapons, { meleeMaximums } from '../data/melee';
import enemies, { Enemy } from '../data/enemies';

</script>

<template>
    <div>
        <div class="container-fluid border rounded text-center p-3" v-for="melee of meleeWeapons" :key="melee.Name">
            <div class="row">
                <div class="col-3">
                    <h3>{{ melee.Type }}</h3>
                    <h4>{{ melee.Name }}</h4>
                </div>
                <div class="col-9">
                    <div class="row">
                        <div class="col-2 text-end">Damage</div>
                        <div class="col-10 text-start">
                            <div class="progress bg-dark mt-2" role="progressbar">
                                <div class="progress-bar chart-bg" :style="`width: ${melee.Damage.Uncharged / totalValues.Damage * 100}%`">{{ melee.Damage.Uncharged }}</div>
                            </div>
                        </div>
                        <div class="col-2 text-end">Uncharged Damage</div>
                        <div class="col-10 text-start">{{ melee.Damage.Uncharged }}</div>
                    </div>
                    <div class="row">
                        <div class="col text-end">Charged Damage</div>
                        <div class="col text-start">{{ melee.Damage.Charged }}</div>
                    </div>
                    <div class="row">
                        <div class="col text-end">Charged Precision</div>
                        <div class="col text-start">{{ melee["Precision Damage"].Charged }}</div>
                    </div>
                    <div class="row">
                        <div class="col text-end">Uncharged Stagger</div>
                        <div class="col text-start">{{ melee["Stagger Damage"].Uncharged }}</div>
                    </div>
                    <div class="row">
                        <div class="col text-end">Charged Stagger</div>
                        <div class="col text-start">{{ melee["Stagger Damage"].Charged }}</div>
                    </div>
                    <div class="row">
                        <div class="col text-end">Charged DPS</div>
                        <div class="col text-start">{{ (melee.Damage.Charged * (60 / melee["Charge Time"]) / 60).toFixed(2) }}</div>
                    </div>
                    <div class="row">
                        <div class="col text-end">Stagger DPS</div>
                        <div class="col text-start">{{ (melee["Stagger Damage"].Charged * (60 / melee["Charge Time"]) / 60).toFixed(2) }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
