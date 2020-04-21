import { User } from "./user.model";
import { Equipment } from "./equipment.model";
import { Vehicle } from "./vehicle.model";

export class Rent{
    public id: number

    public dateTimeFrom:Date;
    public dateTimeTo:Date;
    public currentDate:Date;
    public user:User;
    public equipment:Equipment[];
    public vehicle:Vehicle;

    constructor(dateTimeFrom:Date, dateTimeTo:Date, currentDate:Date, user:User,equipment:Equipment[], vehicle:Vehicle){
        this.dateTimeFrom = dateTimeFrom,
        this.dateTimeTo = dateTimeTo,
        this.currentDate = currentDate,
        this.user = user,
        this.equipment = equipment,
        this.vehicle = vehicle
    }
}