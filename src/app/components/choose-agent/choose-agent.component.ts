import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  AuthenticationService
} from '../../services/authentication.service';
import {
  AgentService
} from '../../services/agent.service';
import {
  CURRENT_USER
} from '../../constants/local.storage';

@Component({
  selector: 'app-choose-agent',
  templateUrl: './choose-agent.component.html',
  styleUrls: ['./choose-agent.component.css']
})
export class ChooseAgentComponent implements OnInit {
  chooseAgentForm: FormGroup;
  commercialStructureLOV: any[];
  agentLOV: any[];

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private agentService: AgentService,
    private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    const _this = this;
    this.agentService.getCommercialStructure().then(res => {
      _this.commercialStructureLOV = res;
    });
  }

  createForm() {
    this.chooseAgentForm = this.fb.group({
      commercialStructure: ['', Validators.required],
      agent: ['', Validators.required],
    });
  }

  comStructureChange() {
    const _this = this;
    const commercialStructure = this.chooseAgentForm.get('commercialStructure').value; 
    this.agentService.getAgentList(commercialStructure).then(res => {
      _this.commercialStructureLOV = res;
    });
  }

  next() {
    const currentUser = this.authenticationService.currentUserValue;
    currentUser.agentCode = 3;
    //adds chosen agent to current user detail
    localStorage.setItem(CURRENT_USER, JSON.stringify(currentUser));
    this.router.navigate(['']);
  }

}
