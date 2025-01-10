import { Component, OnInit } from '@angular/core';
import { ComponentsWithFormsModule } from '../../../components/components-with-forms.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../pages/auth/auth.service';
import { HelperService } from '../../../universal/helper.service';
import { HttpStatus, IResponse } from '../../../universal/shared.model';
import { RolesService } from '../../role/roles.service';
import { IRole } from '../../role/role.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ComponentsWithFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit{
  formGroup: FormGroup;
  isUpdate: boolean = false;
  roles: IRole[] = [];
  userId: any;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  avatarUrl: string | null = null;
  constructor(
    private fb: FormBuilder,
    private helperSvc: HelperService,
    private authSvc: AuthService,
    private roleSvc: RolesService,
    private route: ActivatedRoute,
    
  ) {
    this.formGroup = this.fb.group({
      email: ['dev.faisalK@gmail.com', [Validators.required, Validators.email]],
      password: ['password', Validators.required],
      name: ['User', Validators.required],
      roles: ['', Validators.required],
      avatarUrl: ['']
    });
  }

  async ngOnInit() {
    this.route.paramMap.subscribe( async (params)  => {
      this.userId = <string>params.get('id');
      if (this.userId) {
        const resp = await this.authSvc.getUserById(this.userId).toPromise();
        this.previewUrl = resp?.data.avatarUrl;
        this.formGroup.patchValue(resp?.data)        
      }
    });
    await this.getRoles()
  
  }

  async onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
  
      // Validate file type
      if (!this.selectedFile.type.startsWith('image/')) {
        console.error('Selected file is not an image.');
        return;
      }
  
      // Validate file size (example: 5MB)
      if (this.selectedFile.size > 5 * 1024 * 1024) {
        console.error('File size exceeds 5MB limit.');
        return;
      }
  
      // Generate preview
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.previewUrl = e.target?.result as string;
      };
      reader.onerror = (err) => {
        console.error('Error reading file:', err);
      };
      reader.readAsDataURL(this.selectedFile);
  
      // Upload file
      try {
        const fd = new FormData();
        fd.append('file', this.selectedFile)
        
        const resp = await this.authSvc.uploadFile(fd).toPromise();
        this.avatarUrl = resp?.data;
        this.formGroup.controls['avatarUrl'].setValue(this.avatarUrl);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
  }
  


  async getRoles() {
    const resp = await this.roleSvc.getRoles().toPromise();
    this.roles = resp.data;    
  }

  async onFormSubmitted(data: any) {
    const loaderText = this.userId ? `Updating user` : 'Adding user';
    this.helperSvc.presentLoader(loaderText);
    
    try {
      if(this.userId) {
        const resp = await <IResponse<any>>this.authSvc.update(data).toPromise();
        if(resp.status == HttpStatus.OK) {
          this.helperSvc.presentAlert(resp.message, 'success')
        } 
      } else {
        const resp = await <IResponse<any>>this.authSvc.register(data).toPromise();
        if(resp.status == HttpStatus.OK) {
          this.helperSvc.presentAlert(resp.message, 'success')
        } 
      }
    } catch (error: any) {
      const errorMessage = error.error?.message || 'An unknown error occurred';
      this.helperSvc.presentAlert(errorMessage , 'error')
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
