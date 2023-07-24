export class ControllerResult<T> {
    data?: T;
    status: ControllerResultStatusContainer;

    constructor(code: Status, data?: T){};
}

export class ControllerResultStatusContainer {
    code: Status;
    text: string;
    message?: string;
    
    constructor(code: Status) {};
}

export enum Status {
    OK = 200,
    Created = 201,
    NoData = 204,
    NotModifed = 304,
    BadRequest = 400,
    NotAuthorized = 401,
    NotFound = 404,
    ImATeapot = 418,
    Error = 500
}