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

  printDocument(extension: String) {
    return this.http.post(
      API_URL + '/utility/downloadFile',
      extension, {
        responseType: 'blob'
      }).map((res: Blob) => {
      return new Blob([res], {
        type: 'application/pdf'
      });
    });
  }

  async validatePrinting(documentPritingDetails: DocumentPrinting): Promise < ReturnDTO > {
    return this.app.post(documentPritingDetails, '/utility/validatePrinting').then(ReturnDTO => ReturnDTO as ReturnDTO);
  }

  async getDateRecord(): Promise < ReturnDTO > {
    return this.app.get('/utility/getDateRecord').then(ReturnDTO => ReturnDTO as ReturnDTO);
  }
}
