export class FormException extends Error{
    public readonly statusCode: string;
    public statusCodeDic = {
        ID: false,
        NAME: false,
        EMAIL: false,
        BIRTHDAY: false,
        PASSWORD: false,
        DISCIPLINE: false,
        QUALIFICATION: false,
        SEMESTER: false
    }

    constructor(message: string, statusCode: string) {
        super(message);
        this.name = 'FormException';
        this.statusCode = statusCode;
    }
}