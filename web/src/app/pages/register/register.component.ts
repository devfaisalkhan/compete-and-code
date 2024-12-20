import { Component } from '@angular/core';
import { ComponentsWithFormsModule } from '../../components/components-with-forms.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { appConfig } from '../../app.config';
import { AppConstant } from '../../universal/app-constant';
import { AuthService } from '../auth/auth.service';
import { HelperService } from '../../universal/helper.service';
import { HttpStatus } from '../../universal/shared.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ComponentsWithFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  showPassword: boolean= false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authSvc: AuthService,
    private helperSvc: HelperService
  ) {
    this.registerForm = this.fb.group({
      name: ['testing', Validators.required],
      email: ['testing@1.com', [Validators.required, Validators.email]],
      password: [this.generateRandomPassword(), Validators.required],
      roles: ['', Validators.required]
    });
  }

  onRegister(form: any) {
    this.helperSvc.presentLoader("Registering user");
      this.authSvc.register(form).subscribe(
        (resp) => {
           this.helperSvc.dismissLoader();
          if(resp.status == HttpStatus.OK) {
            this.helperSvc.presentAlert(resp.message, 'success')
          } else {
            this.helperSvc.presentAlert(resp.message, 'info')
          }
        },
        (error: HttpErrorResponse) => {
          this.helperSvc.dismissLoader();
          const errorMessage = error.error?.message || 'An unknown error occurred';
          this.helperSvc.presentAlert(errorMessage , 'error')
        }
      )
  }

  generateRandomPassword() {
    const length = Math.floor(Math.random() * (12 - 8 + 1)) + 8;  // Random length between 8 and 12
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';

    for (let i = 0; i < length; i++) {
        password += characters[Math.floor(Math.random() * characters.length)];
    }

    return password;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
