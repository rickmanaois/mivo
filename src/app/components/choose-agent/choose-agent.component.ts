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
import { SelectedAgent } from 'src/app/objects/SelectedAgent';

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
    const commercialStructure: number = parseInt(this.chooseAgentForm.get('commercialStructure').value);
    this.agentService.getAgentList(commercialStructure).then(res => {
      _this.agentLOV = res;
    });
  }

  next() {
    const currentUser = this.authenticationService.currentUserValue;
    const agentCode: number = parseInt(this.chooseAgentForm.get('agent').value);
    currentUser.agentCode = agentCode;
    //adds chosen agent to current user detail
    localStorage.setItem(CURRENT_USER, JSON.stringify(currentUser));

    const param = {
      agentCode: agentCode,
      userCode: agentCode
    };

    this.agentService.getProductionAgentProfile(JSON.stringify(param)).then(res => {
      if (res.status) {
        var selectedAgent = new SelectedAgent();
        selectedAgent.agentCode = res.obj["codAgente"];
        selectedAgent.agentName = res.obj["nomAgente"];
        selectedAgent.documentCode = res.obj["codDocumento"];
        selectedAgent.documentType = res.obj["tipoDocumento"];
        selectedAgent.documentName = res.obj["nomTipoDocumento"];
        selectedAgent.agentType = res.obj["tipoAgente"];
        selectedAgent.agentTypeName = res.obj["nomTipoAgente"];
        selectedAgent.agentAddress = res.obj["dirAgente"];
        currentUser.selectedAgent = selectedAgent;
        //adds chosen agent to current user detail
        localStorage.setItem(CURRENT_USER, JSON.stringify(currentUser));
      }
      this.router.navigate(['']);
    });
  }

}
