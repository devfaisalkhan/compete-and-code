import { Component, ViewContainerRef } from '@angular/core';
import { ComponentsWithFormsModule } from '../../../components/components-with-forms.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { HelperService } from '../../../universal/helper.service';
import { OtpComponent } from '../../../components/otp/otp.component';

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
    private viewRef: ViewContainerRef,
    private authSvc: AuthService,
    private helperSvc: HelperService
  ) {
    this.registerForm = this.fb.group({
      name: ['testing', Validators.required],
      email: ['testing@1.com', [Validators.required, Validators.email]],
      password: ['password', Validators.required],
    });
  }

  async onRegister(data: any) {
    this.helperSvc.presentLoader("Registering user");
    let resp:any = null;
    try {
      resp = await this.authSvc.register(data).toPromise();  
    } catch (error: any) {
      const errorMessage = error.error?.message || 'An unknown error occurred';
      this.helperSvc.presentAlert(errorMessage , 'error')
    } finally {
      this.helperSvc.dismissLoader()
    }

    // if(!resp?.data.emailVerified) {
    //   this.open(form.email)
    //   const resp = await this.authSvc.sendOtp(form.email).toPromise();
    //   console.log(resp);
    // }
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


  openComponent(email: string) {
    this.viewRef.clear();
    const componentRef = this.viewRef.createComponent(OtpComponent);
    componentRef.instance.email = email;

    this.openModal();
  }

  openModal() {
    const otpModal = new window.bootstrap.Modal(document.getElementById('otpModal'));
    otpModal.show();
  }
}
