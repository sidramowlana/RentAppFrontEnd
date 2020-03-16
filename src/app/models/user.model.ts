
export class User {
    public id: number

    public name:String;
    public nic:String;
    public dob:String;
    public email:String;
    public mobileNo:String;
    public drivingLicence:String;
    public username:String;
    public password:String;

    constructor(name:String,nic:String,dob:String,email:String,mobileNo:String,drivingLicence:String,username:String,password:String){
        this.name = name;
        this.nic = nic;
        this.dob= dob;
        this.email = email;
        this.mobileNo =mobileNo;
        this.drivingLicence = drivingLicence;
        this.username= username;
        this.password = password;
    }
}