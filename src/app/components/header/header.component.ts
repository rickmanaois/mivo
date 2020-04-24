import {
  Component,
  OnInit
} from '@angular/core';
import {
  Globals
} from '../../utils/global';
import {
  Router
} from '@angular/router';
import {
  AuthenticationService
} from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {}

  ngOnInit() {}

  setPage(val: String) {
    Globals.setPage(val);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
