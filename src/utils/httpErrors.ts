import { AppError } from "../errors/AppError";

export function NOTFOUND(message: string = "Not Found"){
    return new AppError(message, 404, true);}