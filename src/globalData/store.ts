import { UserInterface } from "../interfaces/UserInterface";

export const store:any = {

    loggedInUser: {
        employeeID:0,
        firstName:"",
        lastName:"",
        username:"",
        role:""
    } as UserInterface,



    baseURL: "http://localhost:8080/"




}