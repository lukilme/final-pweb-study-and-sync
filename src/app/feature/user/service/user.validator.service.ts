import { Injectable } from "@angular/core";
import { UserRegisterData } from "../../../core/interfaces/user.register.interface";

@Injectable({
    providedIn: 'root'
})
export class UserValidator {
    public static readonly MIN_NAME = 2;
    public static readonly MAX_NAME = 255;
    public static readonly MIN_EMAIL = 5;
    public static readonly MAX_EMAIL = 255;
    public static readonly PATTERN_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    public static readonly PATTERN_NAME = /^[a-zA-Zà-üÀ-Ü\s]+$/;

    private constructor() { }

    static registerValidate(data: UserRegisterData) {
        UserValidator.nameUserValidate(data.nameRegisterField);
        UserValidator.emailUserValidate(data.emailRegisterField);
        UserValidator.passwordUserValidate(data.passwordRegisterField, data.repeat_passwordRegisterField);
        UserValidator.birthdayUserValidate(data.birthdayRegisterField);
    }

    private static nameUserValidate(name: string) {
        if (!name || name.length < this.MIN_NAME || name.length > this.MAX_NAME) {
            throw new Error(`Name must be between ${this.MIN_NAME} and ${this.MAX_NAME} characters.`);
        }
        if (!this.PATTERN_NAME.test(name)) {
            throw new Error("Name contains invalid characters.");
        }
    }

    private static emailUserValidate(email: string) {
        if (!email || email.length < this.MIN_EMAIL || email.length > this.MAX_EMAIL) {
            throw new Error(`Email must be between ${this.MIN_EMAIL} and ${this.MAX_EMAIL} characters.`);
        }
        if (!this.PATTERN_EMAIL.test(email)) {
            throw new Error("Email format is invalid.");
        }
    }

    private static passwordUserValidate(password: string, repeat_password: string) {
        if (!password || password.length < 8) {
            throw new Error("Password must be at least 8 characters long.");
        }
        if (password !== repeat_password) {
            throw new Error("Passwords do not match.");
        }
        //if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
            //throw new Error("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
        //}
    }

    private static birthdayUserValidate(birthday: string) {
        const date = new Date(birthday);
        const today = new Date();
        if (isNaN(date.getTime())) {
            throw new Error("Invalid date format.");
        }
        if (date > today) {
            throw new Error("Birthday cannot be in the future.");
        }
        const age = today.getFullYear() - date.getFullYear();
        const monthDiff = today.getMonth() - date.getMonth();
        const dayDiff = today.getDate() - date.getDate();
        if (age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
            throw new Error("You must be at least 18 years old.");
        }
    }
}
