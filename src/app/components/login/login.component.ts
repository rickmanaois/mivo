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
  Utility
} from '../../utils/utility';
import {
  BsModalService,
  BsModalRef
} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  MIVO_LOGIN: "MIVO_login";
  
  //modal reference
  modalRef: BsModalRef;

  constructor(private router: Router,
    private fb: FormBuilder,
    private modalService: BsModalService) {
    this.createForm();
  }

  ngOnInit() {
    this.modalRef = Utility.modal(this.modalService, "You are about to enter MAPFRE INSURANCE INFORMATION SYSTEM. The access and use of this system is limited to duly authorized personnel and strictly for official use only. MAPFRE INSURANCE informs all of its employees, agents, representatives, service providers, and all natural or juridical persons having official transactions with the company involving similar access to its information system that Information accessed in MAPFRE SYSTEM is considered property of MAPFRE INSURANCE and is subject to obligation of confidentiality and security in accordance with the laws on privacy and protection of personal information.", "MAPFRE INFORMATION USAGE SECURITY NOTICE");

    var mivoLogin = localStorage.getItem(this.MIVO_LOGIN);
    if (mivoLogin != null) {
      var login = JSON.parse(mivoLogin);
      this.loginForm.markAsDirty();
      this.loginForm.setValue({
        "username": login.username,
        "password": login.password,
        "rememberMe": login.rememberMe
      });
    }
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [],
    });
  }

  rememberMe(): void {
    if (this.loginForm.value.rememberMe) {
      localStorage.setItem(this.MIVO_LOGIN, JSON.stringify(this.loginForm.value));
    } else {
      localStorage.removeItem(this.MIVO_LOGIN);
    }
  }

  onSubmit(): void {
    this.rememberMe();
    this.router.navigateByUrl('/mivo');
  }
}
