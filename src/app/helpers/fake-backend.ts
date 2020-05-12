import {
  Injectable
} from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import {
  Observable,
  of ,
  throwError
} from 'rxjs';
import {
  delay,
  mergeMap,
  materialize,
  dematerialize
} from 'rxjs/operators';
import {
  User
} from '../objects/User';

// array in local storage for registered users
// let users = JSON.parse(localStorage.getItem('users')) || [];
const users = [{
  userId: 1,
  role: 1,
  userName: 'np',
  password: 'np',
  firstName: 'Nathalie',
  lastName: 'Domingo',
  fullName: 'Nathalie Domingo',
  address: 'Sta. Rita, Olonggapo City, Zambales, Philippines',
  commStructure: 4001,
  expiryDay: 4,
  token: 'faketoken'
},{
  userId: 2,
  role: 2,
  userName: 'jb',
  password: 'jb',
  firstName: 'Jethru',
  lastName: 'Balarbar',
  fullName: 'Jethru Balarbar',
  address: 'Sagud Bahley, San Fabian, Pangasinan, Philippines',
  commStructure: 4001,
  expiryDay: 11,
  token: 'faketoken'
}]

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {
    const {
      url,
      method,
      headers,
      body
    } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/users/register') && method === 'POST':
          return register();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        case url.match(/\/users\/\d+$/) && method === 'DELETE':
          return deleteUser();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions
    function authenticate() {
      const {
        username,
        password
      } = body;
      const user = users.find(x => x.userName === username && x.password === password);
      if (!user) return error('Username or password is incorrect');
      return ok(new User(user))
    }

    function register() {
      const user = body

      if (users.find(x => x.userName === user.username)) {
        return error('Username "' + user.username + '" is already taken')
      }

      user.id = users.length ? Math.max(...users.map(x => x.userId)) + 1 : 1;
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));

      return ok();
    }

    function getUsers() {
      if (!isLoggedIn()) return unauthorized();
      return ok(users);
    }

    function deleteUser() {
      if (!isLoggedIn()) return unauthorized();

      const userss = users.filter(x => x.userId !== idFromUrl());
      localStorage.setItem('users', JSON.stringify(userss));
      return ok();
    }

    // helper functions

    function ok(body ? ) {
      return of(new HttpResponse({
        status: 200,
        body
      }))
    }

    function error(message) {
      return throwError({
        error: {
          message
        }
      });
    }

    function unauthorized() {
      return throwError({
        status: 401,
        error: {
          message: 'Unauthorised'
        }
      });
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};