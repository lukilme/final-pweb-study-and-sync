import { Injectable } from "@angular/core";
import { UserRegisterData } from "../../../core/interfaces/user.register.interface";
import { UserLoginData } from "../../../core/interfaces/user.login.interface";

@Injectable({
    providedIn: 'root'
})
export class UserValidator {
    // Define minimum and maximum lengths for various fields
    public static readonly MIN_NAME = 2;
    public static readonly MAX_NAME = 255;
    public static readonly MIN_QUALIFICATION = 16;
    public static readonly MAX_QUALIFICATION = 255;
    public static readonly MIN_EMAIL = 5;
    public static readonly MAX_EMAIL = 128;
    public static readonly MIN_PASSWORD = 8;
    public static readonly PATTERN_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    public static readonly PATTERN_NAME = /^[a-zA-Zà-üÀ-Ü\s]+$/;

    private constructor() { }

    /**
     * Validates registration data.
     * @param data - The registration data to validate.
     */
    static registerValidate(data: UserRegisterData) {
        this.nameUserValidate(data.nameRegisterField);
        this.emailUserValidate(data.emailRegisterField);
        this.passwordUserValidate(data.passwordRegisterField, data.repeat_passwordRegisterField);
        this.birthdayUserValidate(data.birthdayRegisterField);
    }

    /**
     * Validates login data.
     * @param data - The login data to validate.
     */
    static loginValidate(data: UserLoginData) {
        this.emailUserValidate(data.emailLoginField);
    }

    /**
     * Validates user name.
     * @param name - The name to validate.
     * @throws Error if name is invalid.
     */
    private static nameUserValidate(name: string) {
        if (!name || name.length < this.MIN_NAME || name.length > this.MAX_NAME) {
            throw new Error(`Name must be between ${this.MIN_NAME} and ${this.MAX_NAME} characters.`);
        }
        if (!this.PATTERN_NAME.test(name)) {
            throw new Error("Name contains invalid characters.");
        }
    }

    /**
     * Validates user email.
     * @param email - The email to validate.
     * @throws Error if email is invalid.
     */
    private static emailUserValidate(email: string) {
        if (!email || email.length < this.MIN_EMAIL || email.length > this.MAX_EMAIL) {
            throw new Error(`Email must be between ${this.MIN_EMAIL} and ${this.MAX_EMAIL} characters.`);
        }
        if (!this.PATTERN_EMAIL.test(email)) {
            throw new Error("Email format is invalid.");
        }
    }

    /**
     * Validates user password and its confirmation.
     * @param password - The password to validate.
     * @param repeat_password - The password confirmation to validate.
     * @throws Error if password is invalid or does not match the confirmation.
     */
    private static passwordUserValidate(password: string, repeat_password: string) {
        if (!password || password.length < this.MIN_PASSWORD) {
            throw new Error(`Password must be at least ${this.MIN_PASSWORD} characters long.`);
        }
        if (password !== repeat_password) {
            throw new Error("Passwords do not match.");
        }
        // Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character
        //if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
            //throw new Error("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
        //}
    }

    /**
     * Validates user birthday.
     * @param birthday - The birthday to validate.
     * @throws Error if the date is invalid or if the user is underage or the date is in the future.
     */
    private static birthdayUserValidate(birthday: string) {
        const date = new Date(birthday);
        const today = new Date();
        
        // Check if the date is valid
        if (isNaN(date.getTime())) {
            throw new Error("Invalid date format.");
        }
        
        // Check if the date is in the future
        if (date > today) {
            throw new Error("Birthday cannot be in the future.");
        }
        
        // Calculate age and check if the user is at least 18 years old
        const age = today.getFullYear() - date.getFullYear();
        const monthDiff = today.getMonth() - date.getMonth();
        const dayDiff = today.getDate() - date.getDate();
        
        if (age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
            throw new Error("You must be at least 18 years old.");
        }
    }
}
