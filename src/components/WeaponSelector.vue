<script setup lang="ts">
import type { Weapon } from '../data/weapons';
import { MeleeWeapon } from '../data/melee';
import { SentryTool } from '../data/tool';

const props = defineProps<{
    weapons: (Weapon | MeleeWeapon | SentryTool)[],
}>();
</script>

<template>
    <div class="container-fluid" style="background-color: #010508; color: #d3f7ff;">
        <div class="row border" v-for="weapon of weapons" :key="weapon.Name">
            <div class="col">
                {{ weapon.Name }}
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
