export class VehicleType {
    
    public vehicleTypeId: number;
    public name: String;
    public amount: number;

    constructor(name: String, amount: number) {        
        this.name = name;
        this.amount = amount;
    }
}