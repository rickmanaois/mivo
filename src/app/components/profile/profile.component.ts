import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  AuthenticationService
} from '../../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser = this.authenticationService.currentUserValue;
  changePasswordForm: FormGroup;
  constructor(private fb: FormBuilder,
    private authenticationService: AuthenticationService) {
    this.createChangePasswordForm();
  }

  createChangePasswordForm() {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit() {

  }

}
