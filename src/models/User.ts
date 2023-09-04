import { USER_ROLES, UserModel } from "../types/types";

export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: USER_ROLES
    ) {}

    public getId = (): string => {
        return this.id
    }

    public getName = (): string => {
        return this.name
    }

    public getEmail = (): string => {
        return this.email
    }

    public getPassword = (): string => {
        return this.password
    }

    public getRole = (): USER_ROLES => {
        return this.role
    }

    public getUserModel = (): UserModel => {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role
        }
    }

    public setName = (newName: string): void => {
        this.name = newName
    }

    public setPassword = (newPassword: string): void => {
        this.password = newPassword
    }
}