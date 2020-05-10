import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  PolicyHolder
} from 'src/app/objects/PolicyHolder';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-policy-holder',
  templateUrl: './policy-holder.component.html',
  styleUrls: ['./policy-holder.component.css']
})
export class PolicyHolderComponent implements OnInit {
  @Input() policyHolder: PolicyHolder;
  @Input() details: any;
  _details: any;

  phForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.phForm = this.fb.group({
      //policy holder
      name: ['', Validators.required]
    });
  }

}
