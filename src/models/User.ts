import { USER_ROLES } from "../types/types";

export class User {
    constructor(
        private name: string,
        private email: string,
        private password: string,
        private role: USER_ROLES
    ) {}

    public getName = (): string => {
        return this.name
    }

    public getEmail = (): string => {
        return this.email
    }

    public getPassword = (): string => {
        return this.password
    }

    public getRole = (): string => {
        return this.role
    }

    public setName = (newName: string): void => {
        this.name = newName
    }

    public setPassword = (newPassword: string): void => {
        this.password = newPassword
    }
}