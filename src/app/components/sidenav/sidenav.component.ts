import { Component, OnInit } from '@angular/core';
import { Globals } from '../../utils/global';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  setPage(val: String) {
    Globals.setPage(val);
  }

  get page(){
    return Globals.page;
  }
}
