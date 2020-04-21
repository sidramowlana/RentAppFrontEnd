import { User } from "./user.model";
import { Equipment } from "./equipment.model";
import { Vehicle } from "./vehicle.model";
import { vehicleRentEquipment } from "./vehicleRentEquipment.model";

export class Rent{
    public id: number

    public dateTimeFrom:Date;
    public dateTimeTo:Date;
    public currentDate:Date;
    public user:User;
    public equipment:Equipment[];
    public vehicle:Vehicle;
    public vehicleRentEquipement:vehicleRentEquipment;

    constructor(dateTimeFrom:Date, dateTimeTo:Date, currentDate:Date, user:User,equipment:Equipment[], vehicle:Vehicle,vehicleRentEquipement:vehicleRentEquipment){
        this.dateTimeFrom = dateTimeFrom,
        this.dateTimeTo = dateTimeTo,
        this.currentDate = currentDate,
        this.user = user,
        this.equipment = equipment,
        this.vehicle = vehicle,
        this.vehicleRentEquipement = vehicleRentEquipement
    }
}