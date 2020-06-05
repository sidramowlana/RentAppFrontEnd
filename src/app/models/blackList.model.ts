import { User } from "./user.model";
import { Rent } from "./rent.model";

export class BlackList {
    public user: User;
    public rent: Rent;

    constructor(user: User, rent: Rent) {
    this.user = user;
        this.rent = rent;
    }
}