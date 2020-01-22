import { Component, OnInit } from '@angular/core';
import { Globals } from '../../utils/global';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  get page(){
    return Globals.page;
  }
}
