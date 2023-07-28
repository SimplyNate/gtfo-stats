<script setup lang="ts">
import { Booster } from "../data/boosters.ts";

const props = defineProps<{
    booster?: Booster;
    tier: string;
}>();
</script>

<template>
    <div>
        <div class="weapon-type">{{ tier }} Booster</div>
        <div class="image-box">
            <div v-if="!booster" class="img-container d-flex align-items-center justify-content-center">
                <div class="plus fs-1">&plus;</div>
            </div>
            <div v-else class="img-container ps-1">
                <div style="font-size: 12px;" v-for="positive of booster.positive" :key="positive.stat">
                    {{ positive.stat }}
                </div>
                <div v-for="negative of booster.negative" :key="negative.stat" style="font-size: 12px; color: red">
                    {{ negative.stat }}
                </div>
            </div>
            <div v-if="!booster" class="weapon-name ms-1">Select a Booster</div>
        </div>
    </div>
</template>

<style scoped>
.image-box {
    width: 150px;
    height: 150px;
    border-top: 2px solid;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-left: 8px solid;
}
.img-container {
    width: 100%;
    height: 80%;
}
</style>
