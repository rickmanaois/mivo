import {
  Component,
  OnInit
} from '@angular/core';
import {
  Globals
} from '../../utils/global';
import {
  page
} from '../../constants/page';
import {
  MENU
} from '../../constants/local.storage';
import {
  AuthenticationService
} from '../../services/authentication.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  currentUser = this.authenticationService.currentUserValue;
  p = page; //constant pages
  menu = JSON.parse(localStorage.getItem(MENU));

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {}

  setPage(val: String) {
    Globals.setPage(val);
  }

  get page() {
    return Globals.page;
  }
}
