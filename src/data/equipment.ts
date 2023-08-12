export interface Equipment {
    [index: string]: any;
    Name: string;
    Type: string;
}

export interface AmmoEquipment extends Equipment {
    'Max Ammo': number;
    'Starting Ammo': number;
    'Ammo Per Refill': number;
}

export interface DamageEquipment extends AmmoEquipment {
    Damage: number;
    'Precision Multiplier': number;
    'Stagger Multiplier': number;
}

export abstract class EnhancedEquipment {
    [index: string]: any;
    public equipment: Equipment;

    protected constructor(equipment: Equipment) {
        this.equipment = equipment;
    }
    get Name(): string {
        return this.equipment.Name;
    }
    get Type(): string {
        return this.equipment.Type;
    }
}

export abstract class EnhancedAmmoEquipment extends EnhancedEquipment {
    public equipment: AmmoEquipment;
    protected equipmentAmmoModifier: number;
    protected equipmentRefillModifier: number;

    protected constructor(tool: AmmoEquipment) {
        super(tool);
        // Make VLS happy
        this.equipment = tool;
        this.equipmentAmmoModifier = 1;
        this.equipmentRefillModifier = 1;
    }

    set ammoModifier(value: number) {
        this.equipmentAmmoModifier = 1 + value;
    }
    set refillModifier(value: number) {
        this.equipmentRefillModifier = 1 + value;
    }
    get startingAmmo() {
        return this.equipment['Starting Ammo'] * this.equipmentAmmoModifier;
    }
    get ammoPerRefill() {
        return this.equipment['Ammo Per Refill'] * this.equipmentRefillModifier;
    }
}

export abstract class EnhancedDamageEquipment extends EnhancedAmmoEquipment {
    public equipment: DamageEquipment;
    protected equipmentDamageModifier: number;

    protected constructor(tool: DamageEquipment) {
        super(tool);
        this.equipment = tool;
        this.equipmentDamageModifier = 1;
    }
    set damageModifier(value: number) {
        this.equipmentDamageModifier = 1 + value;
    }
    get damage() {
        return this.equipment.Damage * this.equipmentDamageModifier;
    }
}
