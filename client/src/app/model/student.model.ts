export class Student {
    public _id: string = '';
    public firstName: string = '';
    public lastName: string = '';
    public phone: string = '';
    public profileImage: string = '';
  
    constructor() {}
  }
  
  export class APIResponse {
    public status: ResponseStatus = ResponseStatus.NONE;
    public student: Student = new Student();
  }
  
  export enum ResponseStatus {
    NONE = 'none',
    SUCCESS = 'success',
  }
  