import { Pipe, PipeTransform } from '@angular/core';
import { Vehicle } from '../models/vehicle.model';
import { Equipment } from '../models/equipment.model';
@Pipe({
    name: 'filterEquipment'
})
export class FilterEquipmentPipe implements PipeTransform {
    transform(equipments: Equipment[], searchText: string): any[] {
        if (!equipments || !searchText) {return equipments};
        return equipments.filter(equipment => {
            return equipment.equipmentName.toLowerCase().includes(searchText) === equipment.equipmentName.includes(searchText);
        });
    }
}