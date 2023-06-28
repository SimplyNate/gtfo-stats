<script setup lang="ts">
import type { MeleeWeapon } from '../data/melee';
import meleeWeapons from '../data/melee';
import enemies from '../data/enemies';

const props = defineProps({
    weaponValues: Object,
});
const striker = enemies.find(e => e.Name === 'Striker');
const shooter = enemies.find(e => e.Name === 'Shooter');
const gStriker = enemies.find(e => e.Name === 'Giant');
const gShooter = enemies.find(e => e.Name === 'Giant Shooter');
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
                        <h4>Uncharged Damage: {{ melee.Damage.Uncharged }}</h4>
                        <h4>Charged Damage: {{ melee.Damage.Charged }}</h4>
                    </div>
                    <div class="row">
                        <h4>Uncharged Stagger: {{ melee["Stagger Damage"].Uncharged }}</h4>
                        <h4>Charged Stagger: {{ melee["Stagger Damage"].Charged }}</h4>
                    </div>
                </div>
                <div class="col">
                    <div class="row">
                        <div class="fw-bold">Stealth</div>
                        <div>Striker: {{ melee.Damage.Charged * melee["Precision Multiplier"].Charged * striker["Weak Points"] }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
