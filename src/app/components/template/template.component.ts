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

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  p = page; //constant pages

  constructor() {}

  ngOnInit() {}

  get page() {
    return Globals.page;
  }
}
