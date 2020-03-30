import { Pipe, PipeTransform } from '@angular/core';
import { Vehicle } from '../models/vehicle.model';
@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(vehicles: Vehicle[], searchText: string): any[] {
        if (!vehicles || !searchText) {return vehicles};
        return vehicles.filter(vehicle => {
            return vehicle.vehicleName.toLowerCase().includes(searchText) === vehicle.vehicleName.includes(searchText);
        });
    }
}