import { VehicleType } from "./vehicleType.model";

export class Vehicle{
    public vehicleId:number;
    public vehicleName:String;
    public plateNo:String;
    public amount:number;
    public quantity:number ;
    public description:String;
    public imageUrl:String;
    public vehicleType:VehicleType;
    public stringname:String

    constructor(vehicleName:String, plateNo:String, amount,number,quantity:number, description:String,imageUrl:String,vehicleType:VehicleType,stringname:String){
        this.vehicleName = vehicleName,
        this.plateNo = plateNo,
        this.amount = amount,
        this.quantity = quantity,
        this.description = description,
        this.imageUrl = imageUrl,
        this.vehicleType = vehicleType,
        this.stringname = stringname
    }
}