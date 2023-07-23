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
            <div class="img-container d-flex align-items-center justify-content-center">
                <div class="plus fs-1" v-if="!props.weapon">&plus;</div>
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