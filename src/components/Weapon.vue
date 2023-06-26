<template>
    <div class="container-fluid border rounded text-center p-3">
        <div class="row">
            <div class="col">
                <h1>{{ weapon.Type }}</h1>
                <h2>{{ weapon.Name }}</h2>
            </div>
            <div class="col">
                <div class="row">
                    <h4>Damage: {{ weapon.Damage }}</h4>
                </div>
                <div class="row">
                    <h4>Stagger: {{ weapon["Stagger Multiplier"] * weapon.Damage }}</h4>
                </div>
                <div class="row">
                    <h4>Headshot Damage: {{ weapon['Headshot Damage']}}</h4>
                </div>
            </div>
            <div class="col">
                <div class="row">
                    <h4>DPS: {{ Math.round(weapon.Damage * weapon['Rate of Fire'] / 60) }}</h4>
                </div>
                <div class="row">
                    <h4>Damage Per Mag: {{ Math.round(weapon.Damage * weapon['Magazine Size']) }}</h4>
                </div>
                <div class="row">
                    <h4>Total Damage: {{ Math.round(weapon.Damage * weapon['Max Ammo']) }}</h4>
                </div>
            </div>
            <div class="col">
                <div class="row">
                    <h5>Striker max shots to kill: {{ striker.Health / weapon.Damage }}</h5>
                </div>
                <div class="row">
                    <h5>Shooter max shots to kill: {{ shooter.Health / weapon.Damage }}</h5>
                </div>
                <div class="row">
                    <h5>Giant max shots to kill: {{ gStriker.Health / weapon.Damage }}</h5>
                </div>
                <div class="row">
                    <h5>Giant Shooter max shots to kill: {{ gShooter.Health / weapon.Damage }}</h5>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Weapon } from '../data/mainWeapons';
import enemies from '../data/enemies';

const props = defineProps({
    weaponValues: Object,
});
const weapon: Weapon = <Weapon>props.weaponValues;
const striker = enemies.find(e => e.Name === 'Striker');
const shooter = enemies.find(e => e.Name === 'Shooter');
const gStriker = enemies.find(e => e.Name === 'Giant');
const gShooter = enemies.find(e => e.Name === 'Giant Shooter');

</script>

<style scoped>

</style>
