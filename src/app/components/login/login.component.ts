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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  MIVO_LOGIN : "MIVO_login";
  constructor(private router: Router,
    private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    var mivoLogin = localStorage.getItem(this.MIVO_LOGIN);
    if (mivoLogin != null) {
      var login = JSON.parse(mivoLogin);
      this.loginForm.markAsDirty();
      this.loginForm.setValue(
        {"username": login.username,
        "password": login.password,
        "rememberMe": login.rememberMe});
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
    this.router.navigateByUrl('/template');
  }
}
