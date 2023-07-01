<script setup lang="ts">
import meleeWeapons from '../data/melee';
import enemies, { Enemy } from '../data/enemies';

const striker = <Enemy>enemies.find(e => e.Name === 'Striker');
const shooter = <Enemy>enemies.find(e => e.Name === 'Shooter');
const gStriker = <Enemy>enemies.find(e => e.Name === 'Giant');
const gShooter = <Enemy>enemies.find(e => e.Name === 'Giant Shooter');
const scout = <Enemy>enemies.find(e => e.Name === 'Scout');
const charger = <Enemy>enemies.find(e => e.Name === 'Charger');
</script>

<template>
    <div>
        <div class="container-fluid border rounded text-center p-3" v-for="melee of meleeWeapons" :key="melee.Name">
            <div class="row">
                <div class="col">
                    <h1>{{ melee.Type }}</h1>
                    <h3>{{ melee.Name }}</h3>
                </div>
                <div class="col">
                    <div class="row">
                        <div>Uncharged Damage: {{ melee.Damage.Uncharged }}</div>
                        <div>Charged Damage: {{ melee.Damage.Charged }}</div>
                    </div>
                    <div class="row">
                        <div>Uncharged Stagger: {{ melee["Stagger Damage"].Uncharged }}</div>
                        <div>Charged Stagger: {{ melee["Stagger Damage"].Charged }}</div>
                    </div>
                    <div class="row">
                        <div>Charged DPS: {{ (melee.Damage.Charged * (60 / melee["Charge Time"]) / 60).toFixed(2) }}</div>
                        <div>Stagger DPS: {{ (melee["Stagger Damage"].Charged * (60 / melee["Charge Time"]) / 60).toFixed(2) }}</div>
                    </div>
                </div>
                <div class="col">
                    <div class="row">
                        <div class="fw-bold">Stealth</div>
                        <div>Striker: {{ (melee.Damage.Charged * melee["Precision Multiplier"].Charged * melee["Stealth Multiplier"].Charged * striker["Weak Points"].Occipital.Multiplier / striker.Health * 100).toFixed(2) }}%</div>
                        <div>Shooter: {{ (melee.Damage.Charged * melee["Precision Multiplier"].Charged * melee["Stealth Multiplier"].Charged * shooter["Weak Points"].Occipital.Multiplier  / shooter.Health * 100).toFixed(2) }}%</div>
                        <div>Giant: {{ (melee.Damage.Charged * melee["Precision Multiplier"].Charged * melee["Stealth Multiplier"].Charged * gStriker["Weak Points"].Occipital.Multiplier / gStriker.Health * 100).toFixed(2) }}%</div>
                        <div>Giant Shooter: {{ (melee.Damage.Charged * melee["Precision Multiplier"].Charged * melee["Stealth Multiplier"].Charged * gShooter["Weak Points"].Occipital.Multiplier / gShooter.Health * 100).toFixed(2) }}%</div>
                        <div>Scout: {{ (melee.Damage.Charged * melee["Precision Multiplier"].Charged * melee["Stealth Multiplier"].Charged * scout["Weak Points"].Occipital.Multiplier / scout.Health * 100).toFixed(2) }}%</div>
                        <div>Charger: {{ (melee.Damage.Charged * melee["Precision Multiplier"].Charged * melee["Stealth Multiplier"].Charged * charger["Weak Points"].Back.Multiplier / charger.Health * 100).toFixed(2) }}%</div>
                    </div>
                </div>
                <div class="col">
                    <div class="row">
                        <div class="fw-bold">Active</div>
                        <div>Striker: {{ (melee.Damage.Charged * melee["Precision Multiplier"].Charged * striker["Weak Points"].Head.Multiplier / striker.Health * 100).toFixed(2) }}%</div>
                        <div>Shooter: {{ (melee.Damage.Charged * melee["Precision Multiplier"].Charged * shooter["Weak Points"].Head.Multiplier  / shooter.Health * 100).toFixed(2) }}%</div>
                        <div>Giant: {{ (melee.Damage.Charged / gStriker.Health * 100).toFixed(2) }}%</div>
                        <div>Giant Shooter: {{ (melee.Damage.Charged / gShooter.Health * 100).toFixed(2) }}%</div>
                        <div>Charger: {{ (melee.Damage.Charged / charger.Health * 100).toFixed(2) }}%</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
