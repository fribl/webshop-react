
import { IUser } from "./user-interface";

export interface IUserContext {
    user: IUser;
    updateUser: (firstname:string, lastname:string, email:string) => void
    //postUser: (id:number, name:string, basket: number[]) => void
}

