import {Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
// import { catchError, map, toPromise } from 'rxjs/operators';
import {API_URL} from '../constants/app.constant';

export const InterceptorSkipHeader = 'X-Skip-Interceptor';

import {
  BsModalService,
  BsModalRef
} from 'ngx-bootstrap/modal';
import { Utility } from '../utils/utility';

@Injectable()
export class AppService {
  modalRef: BsModalRef;
  constructor(
    private http: HttpClient,
    private modalService: BsModalService) {
  }

  async doWhatever(param: any, endpoint: string): Promise<any> {
    return this.http.post(API_URL + endpoint, param)
      .toPromise()
      .then(response => response)
      .catch(err => this.modalRef = Utility.showError(this.modalService, err.message));
  }
}
