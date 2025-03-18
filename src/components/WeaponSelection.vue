<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
    weapon: any;
}>();

const header = computed(() => {
    if (props.weapon) {
        return props.weapon.Type;
    }
    return 'Blank';
});

const name = computed(() => {
    if (props.weapon) {
        return props.weapon.Name;
    }
    return 'Select a Weapon';
});

</script>

<template>
    <div>
        <div class="weapon-type">{{ header }}</div>
        <div class="image-box">
            <div class="img-container d-flex align-items-center justify-content-center p-5">
                <div class="plus fs-1" v-if="!weapon">&plus;</div>
                <template v-else>
                    <img :src="weapon.equipment.Image" :alt="weapon.Name" style="max-height: 175px; transform: rotate(60deg);" v-if="weapon.equipment['Charge Time']">
                    <img :src="weapon.equipment.Image" :alt="weapon.Name" style="max-height: 150px;" v-else>
                </template>
            </div>
            <div class="weapon-name ms-1">{{ name }}</div>
        </div>
    </div>
</template>

<style scoped>
.image-box {
    width: 241px;
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