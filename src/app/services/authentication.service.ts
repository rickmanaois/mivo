import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  BehaviorSubject,
  Observable
} from 'rxjs';
import {
  map
} from 'rxjs/operators';
import {
  environment
} from '../../environments/environment';
import {
  User
} from '../objects/User';
import {
  CURRENT_USER,
  MENU
} from '../constants/local.storage';
import {
  Page
} from '../objects/Page';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject < User > ;
  public currentUser: Observable < User > ;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject < User > (JSON.parse(localStorage.getItem(CURRENT_USER)));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: String, password: String) {
    return this.http.post < any > (`${environment.apiUrl}/users/authenticate`, {
        username,
        password
      })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem(CURRENT_USER, JSON.stringify(user));
        this.currentUserSubject.next(user);

        this.getPages();

        return user;
      }));
  }

  getPages() {
    // removing unavailable pages for user
    const unavailablePages = ['commissionsPaid',
      'estimatedCommissions',
      'premiumCollection',
      'client',
      'news',
      'requests'
    ];
    const page = new Page();
    for (let p in page) {
      if (unavailablePages.includes(p)) {
        page[p] = false;
      }
    }
    localStorage.setItem(MENU, JSON.stringify(page));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem(CURRENT_USER);
    localStorage.removeItem(MENU);
    this.currentUserSubject.next(null);
  }
}