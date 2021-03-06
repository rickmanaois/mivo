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
import {
  Utility
} from 'src/app/utils/utility';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  currentUser = this.authenticationService.currentUserValue;
  hasSelectedAgent = !Utility.isUndefined(this.currentUser.selectedAgent);
  p = page; //constant pages
  menu = JSON.parse(localStorage.getItem(MENU));

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {}

  setPage(val: String) {
    Globals.setPage(val);
  }

  setAppPage(val: String, t: String) {
    Globals.setPage(val);
    Globals.setLoadQuotation(false);
  }

  get page() {
    return Globals.page;
  }

  get appType() {
    return Globals.getAppType();
  }
}
