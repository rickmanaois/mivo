import {Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
// import { catchError, map, toPromise } from 'rxjs/operators';
import {API_URL} from '../constants/app.constant';

export const InterceptorSkipHeader = 'X-Skip-Interceptor';

@Injectable()
export class AppService {
  constructor(
    private http: HttpClient) {
  }

  doWhatever(param: any, endpoint: string): Promise<any> {
    return this.http.post(API_URL + endpoint, param)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
