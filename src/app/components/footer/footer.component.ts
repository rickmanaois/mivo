import {
  Component,
  OnInit
} from '@angular/core';
import {
  VER
} from '../../constants/app.constant';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  version = VER;
  constructor() {}

  ngOnInit() {}

}
