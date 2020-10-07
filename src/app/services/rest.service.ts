import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


/*export class CornerstoneManifiest {
    manifiest: Array<any>
}*/

@Injectable({
    providedIn: 'root'
})
export class RestService {

    //url opendicom http://192.168.1.102/proxydcmweb/cornerstone_manifiest/3b7ffb7f134b4a7fa1451d0d25280338
    //url externo   http://macmini71.opendicom.com/proxydcmweb/cornerstone_manifiest/3b7ffb7f134b4a7fa1451d0d25280338
    
    private url = 'http://192.168.1.102/proxydcmweb/cornerstone_manifiest/'
    

    constructor(
        private http: HttpClient
    ) { }

    getManifiest(token: string): Observable<Array<any>> {
        return this.http.get<Array<any>>(this.url + token)
        .pipe(
            retry(1),
            catchError(this.handleError)
        );
    }

    // Error handling 
    handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
    }

}
