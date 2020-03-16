export class Equipment{
    public equipmentId:number;
    public equipmentName:String;
    public amount:number;
    public imageUrl:String;
    public description:String;

    constructor(equipmentName:String,amount:number,imageUrl:String,description:String){
        this.equipmentName = equipmentName;
        this.amount = amount;
        this.imageUrl= imageUrl;
        this.description = description;
    }
}