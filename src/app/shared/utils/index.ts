import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

export function handleError(error: HttpErrorResponse) {
    let errMsg: string;

    if (error.error?.message) {
        errMsg = error.error.message;
    } else {
        errMsg = error.message;
    }
    return throwError(errMsg);
}