import { defineStore } from 'pinia';
import { ref } from 'vue';
import { EnhancedEquipment } from './data/equipment';
import { Booster } from './data/boosters';

export const useBuilderStore = defineStore('builder', () => {
    const selectedMainWeapon = ref<EnhancedEquipment>();
    const selectedSpecialWeapon = ref<EnhancedEquipment>();
    const selectedTool = ref<EnhancedEquipment>();
    const selectedMeleeWeapon = ref<EnhancedEquipment>();

    const selectedMutedBooster = ref<Booster>();
    const selectedBoldBooster = ref<Booster>();
    const selectedAggressiveBooster = ref<Booster>();

    function setMainWeapon(weapon: EnhancedEquipment) {
        selectedMainWeapon.value = weapon;
    }
    function setSpecialWeapon(weapon: EnhancedEquipment) {
        selectedSpecialWeapon.value = weapon;
    }
    function setTool(tool: EnhancedEquipment) {
        selectedTool.value = tool;
    }
    function setMeleeWeapon(weapon: EnhancedEquipment) {
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
