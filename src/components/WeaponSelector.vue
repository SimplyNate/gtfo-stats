<script setup lang="ts">
import type { Weapon } from '../data/weapons';
import { MeleeWeapon } from '../data/melee';
import { SentryTool } from '../data/tool';

const props = defineProps<{
    weapons: (Weapon | MeleeWeapon | SentryTool)[],
}>();
</script>

<template>
    <div></div>
</template>

<style scoped>

</style>
