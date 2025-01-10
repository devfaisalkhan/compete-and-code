import { Component, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HelperService } from '../../../universal/helper.service';
import { AuthService } from '../auth.service';
import { ComponentsWithFormsModule } from '../../../components/components-with-forms.module';
import { HttpStatus } from '../../../universal/shared.model';

declare global {
  interface Window {
    bootstrap: any;
  }
}

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
    private helperSvc: HelperService,
    private router: Router  
  ) {
    this.loginForm = this.fb.group({
      email: ['dev.faisalK@gmail.com', [Validators.required, Validators.email]],
      password: ['password', Validators.required]
    });
  }

  async onLogin(data: any) {
    try {
      this.helperSvc.presentLoader("Logging In");
      const resp = await this.authSvc.login(data).toPromise();

      if (resp?.status === HttpStatus.OK) {
        this._saveUserData(resp);
        await this.router.navigate(['/admin/dashboard']);
      } 
  
      
    } catch (error: any) { 
      this.helperSvc.presentAlert(error?.error.message, 'error');

    } finally {
      this.helperSvc.dismissLoader();
    }
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

  private _saveUserData(data: any){
    localStorage.setItem('user', JSON.stringify(data.data))   
    localStorage.setItem('access_token', data?.access_token as any)   
    localStorage.setItem('refresh_token', data.refresh_token as any) 
  }
  
}