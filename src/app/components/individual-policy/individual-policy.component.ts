import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'app-individual-policy',
  templateUrl: './individual-policy.component.html',
  styleUrls: ['./individual-policy.component.css']
})
export class IndividualPolicyComponent implements OnInit {
  @Input() details: any;

  constructor() {}

  ngOnInit(): void {}

}