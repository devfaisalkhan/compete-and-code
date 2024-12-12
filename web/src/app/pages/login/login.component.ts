import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentsWithFormsModule } from '../../components/components-with-forms.module';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HttpStatus } from '../../universal/shared.model';
import { HelperService } from '../../universal/helper.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ComponentsWithFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private helperSvc: HelperService
  ) {
    this.loginForm = this.fb.group({
      email: ['testing@', [Validators.required, Validators.email]],
      password: ['password', Validators.required]
    });
  }

  onLogin(data: any) {
    this.helperSvc.presentLoader("Logging In");
      this.authSvc.login(data).subscribe(
        (resp) => {
          this.helperSvc.dismissLoader();

          if(resp.status == HttpStatus.OK) {
            this.helperSvc.presentAlert(resp.message, 'success')
          }
        },
        (error) => {
          this.helperSvc.dismissLoader();

          this.helperSvc.presentAlert('User not found', 'error')

        }
      ) 
  }
}