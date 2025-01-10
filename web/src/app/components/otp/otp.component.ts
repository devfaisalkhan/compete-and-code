import { Component, Input, input } from '@angular/core';
import { ComponentsWithFormsModule } from '../components-with-forms.module';
import { NgOtpInputComponent } from 'ng-otp-input';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../pages/auth/auth.service';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [ComponentsWithFormsModule, NgOtpInputComponent],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OtpComponent {
  @Input() email!: string;

  formGroup: any;
  otpConfig = {
    length: 6,                   
    allowNumbersOnly: true,      
    disableAutoFocus: true,      
    containerClass: 'otp-container', 
    inputClass: 'otp-input',     
    inputStyles: {               
      borderColor: 'blue',
      fontSize: '16px'
    },
    showError: true,             
    isPasswordInput: true,       
    placeholder: 'X',            
    separator: '-',
  };
  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService
  ) {
    this.formGroup = this.fb.group({
      otp: ['', Validators.required]
    });
  }

  async onSubmit(data: any) {
    const dataToBePassed = {
      otp: data.otp,
      email: this.email
    }
    const resp = await this.authSvc.verifyOtp(dataToBePassed).toPromise();
  }
}
