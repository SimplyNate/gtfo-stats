import { defineStore } from 'pinia';
import { ref } from 'vue';
import { EnhancedWeapon } from './data/weapons';
import { EnhancedTool } from './data/tool';
import { EnhancedMeleeWeapon } from './data/melee';
import { Booster } from './data/boosters';

export const useBuilderStore = defineStore('builder', () => {
    const selectedMainWeapon = ref<EnhancedWeapon>();
    const selectedSpecialWeapon = ref<EnhancedWeapon>();
    const selectedTool = ref<EnhancedTool>();
    const selectedMeleeWeapon = ref<EnhancedMeleeWeapon>();

    const selectedMutedBooster = ref<Booster>();
    const selectedBoldBooster = ref<Booster>();
    const selectedAggressiveBooster = ref<Booster>();

    function setMainWeapon(weapon: EnhancedWeapon) {
        selectedMainWeapon.value = weapon;
    }
    function setSpecialWeapon(weapon: EnhancedWeapon) {
        selectedSpecialWeapon.value = weapon;
    }
    function setTool(tool: EnhancedTool) {
        selectedTool.value = tool;
    }
    function setMeleeWeapon(weapon: EnhancedMeleeWeapon) {
        selectedMeleeWeapon.value = weapon;
    }

    function getBoosterRef(tier: string) {
        if (tier === 'muted') {
            return selectedMutedBooster;
        }
        else if (tier === 'bold') {
            return selectedBoldBooster;
        }
        return selectedAggressiveBooster;
    }
    function setBooster(tier: string, booster: Booster | undefined) {
        const boosterRef = getBoosterRef(tier);
        boosterRef.value = booster;
    }
    return {
        selectedMainWeapon,
        selectedSpecialWeapon,
        selectedTool,
        selectedMeleeWeapon,
        selectedMutedBooster,
        selectedBoldBooster,
        selectedAggressiveBooster,

        setMainWeapon,
        setSpecialWeapon,
        setTool,
        setMeleeWeapon,
        getBoosterRef,
        setBooster,
    };
});
