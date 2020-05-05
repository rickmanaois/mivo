import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  API_URL
} from '../constants/app.constant';
import {
  DocumentPrinting
} from '../objects/DocumentPrinting';

@Injectable()
export class UtilityService {
  constructor(private http: HttpClient) {}

  printDocument(documentPritingDetails: DocumentPrinting) {
    return this.http.post(
      API_URL + '/utility/documentPrinting',
      documentPritingDetails, 
      { responseType: 'blob' }).subscribe((res: Blob) => {
        var data = new Blob([res], {
          type: 'application/pdf'
        });
        if (data != null) {
          window.open(URL.createObjectURL(data));
        }
      });
  }
}
