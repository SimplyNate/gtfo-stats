export interface Equipment {
    [index: string]: string | number;
    Name: string;
    Type: string;
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
