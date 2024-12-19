import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentsWithFormsModule } from '../../components/components-with-forms.module';
import { Router, RouterLink } from '@angular/router';
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
    private helperSvc: HelperService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['dev.faisalK@gmail.com', [Validators.required, Validators.email]],
      password: ['password', Validators.required]
    });
  }

  // async onLogin(data: any) {
  //   this.helperSvc.presentLoader("Logging In");
  //   this.authSvc.login(data).subscribe(
  //     (resp) =>  {
  //       this.helperSvc.dismissLoader();

  //       if(resp.status == HttpStatus.OK) {
  //         await this.router.navigate(['/admin/dashboard']);
  //       }
  //     },
  //     (error) => {
  //       this.helperSvc.dismissLoader();

  //       this.helperSvc.presentAlert('User not found', 'error')

  //     }
  //   ) 
  // }
  
  async onLogin(data: any) {
    try {
      // Show loader
      this.helperSvc.presentLoader("Logging In");
      // Convert the observable to a promise and await its response
      const resp = await this.authSvc.login(data).toPromise();
  
      // Handle the response
      if (resp?.status === HttpStatus.OK) {
        localStorage.setItem('user', JSON.stringify(resp.data))   
        localStorage.setItem('access_token', resp?.access_token as any)   
        localStorage.setItem('refresh_token', resp.refresh_token as any)   
        
        await this.router.navigate(['/admin/dashboard']);

      } else {
        this.helperSvc.presentAlert('User not found', 'error');
      }
  
      this.helperSvc.dismissLoader();
    } catch (error) { 
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
  
}