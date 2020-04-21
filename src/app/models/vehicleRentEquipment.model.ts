import { Rent } from "./rent.model";
import { Equipment } from "./equipment.model";

export class vehicleRentEquipment{
    public id: number

    public dateTimeFrom:Date;
    public dateTimeTo:Date;
    public rent:Rent[]
    public equipment:Equipment[];

    constructor(dateTimeFrom:Date, dateTimeTo:Date, rent:Rent[],equipment:Equipment[]){
        this.dateTimeFrom = dateTimeFrom,
        this.dateTimeTo = dateTimeTo,
        this.rent = rent,
        this.equipment = equipment
    }
}
    