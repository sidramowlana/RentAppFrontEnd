
export class User {
    public id:number
    public name:String;
    public nic:String;
    public email:String;
    public drivingLicenceNo:String;
    public username:String;
    public password:String;

    constructor(name:String, nic:String, email:String, drivingLicenceNo:String, username:String, password:String){
        this.name = name;
        this.nic = nic;
        this.email = email;
        this.drivingLicenceNo = drivingLicenceNo;
        this.username = username;
        this.password = password;
    }
}