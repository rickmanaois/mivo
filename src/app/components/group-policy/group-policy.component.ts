import {
  Component,
  Input
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';
import {
  Validate
} from '../../validators/validate';
import {
  GroupPolicyLOVServices
} from '../../services/lov/group-policy.service';
import {
  GroupPolicyListObject
} from 'src/app/objects/LOV/groupPolicyList';
import {
  GroupPolicy
} from 'src/app/objects/GroupPolicy';

@Component({
  selector: 'app-group-policy',
  templateUrl: './group-policy.component.html',
  styleUrls: ['./group-policy.component.css']
})

export class GroupPolicyComponent {
  @Input() subline: String;
  @Input() groupPolicy: GroupPolicy;
  @Input() details: any;
  _details: any;

  gpForm: FormGroup;
  GPLOV = new GroupPolicyListObject();

  today: Date = new Date();
  expiryDateMinDate: Date = moment().add(1, 'years').toDate();

  constructor(
    private gplov: GroupPolicyLOVServices,
    private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.groupPolicy.agentCode = '1101'; //TODO

      const _this = this;
      this.gplov.getCommercialStructure().then(res => {
        _this.GPLOV.commercialStructureLOV = res;
      });

      Validate.setGroupPolicyValidations(this.gpForm, this.groupPolicy);
    });
  }

  ngOnChanges() {
    this._details = this.details;
    const _this = this;
    this.gplov.getGroupPolicy(this._details.subline).then(res => {
      _this.GPLOV.groupPolicyLOV = res;
    });
  }

  createForm() {
    this.gpForm = this.fb.group({
      //group policy
      groupPolicy: [null],
      contract: [null],
      subContract: [null],
      commercialStructure: ['', Validators.required],
      agentCode: ['', Validators.required],
      cbIsRenewal: [null],
      expiringPolicyNumber: [null]
    });
  }

  groupPolicyOnChange() {
    const _this = this;
    _this.GPLOV.contractLOV = []
    this.gplov.getContract(this._details.subline, this.groupPolicy).then(res => {
      _this.GPLOV.contractLOV = res;
    });
  }

  contractOnChange() {
    const _this = this;
    _this.GPLOV.subContractLOV = []
    this.gplov.getSubContract(this._details.subline, this.groupPolicy).then(res => {
      _this.GPLOV.subContractLOV = res;
    });
  }
}
