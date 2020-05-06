import {
  Injectable
} from '@angular/core';
import 'rxjs/add/operator/map';
import {
  HttpClient
} from '@angular/common/http';
import {
  API_URL
} from '../constants/app.constant';
import {
  DocumentPrinting
} from '../objects/DocumentPrinting';
import {
  AppService
} from '../services/app.service'
import {
  ReturnDTO
} from '../objects/ReturnDTO';

@Injectable()
export class UtilityService {
  constructor(
    private app: AppService,
    private http: HttpClient) {}

  printDocument(documentPritingDetails: DocumentPrinting) {
    this.http.post(
      API_URL + '/utility/documentPrinting',
      documentPritingDetails, {
        responseType: 'blob'
      }).map((res: Blob) => {
      var data = new Blob([res], {
        type: 'application/pdf'
      });
      if (data != null) {
        window.open(URL.createObjectURL(data));
      }
    });
  }

  async validatePrinting(documentPritingDetails: DocumentPrinting): Promise < ReturnDTO > {
    return this.app.post(documentPritingDetails, '/utility/documentPrinting').then(ReturnDTO => ReturnDTO as ReturnDTO);
  }
}
