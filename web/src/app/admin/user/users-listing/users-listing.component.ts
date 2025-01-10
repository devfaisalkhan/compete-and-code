import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../pages/auth/auth.service';
import { HelperService } from '../../../universal/helper.service';
import { HttpStatus } from '../../../universal/shared.model';
import { AppConstant } from '../../../universal/app-constant';

@Component({
  selector: 'app-users-listing',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './users-listing.component.html',
  styleUrl: './users-listing.component.scss'
})
export class UsersListingComponent implements OnInit {
  users: any[] = [];
  permissions: any[] = [];
  isCollapsed = false;
  pageNumber = 1;
  totalItems = 0;
  constructor(
    private authSvc: AuthService,
    private helperSvc: HelperService
  ) { 
  }

  ngOnInit() {
    this._getAllUsers(this.pageNumber, AppConstant.PAGE_SIZE);
  }

  onUpdateUser() {
    
  }

  loadData(pageNum: number) {
    console.log(pageNum);
    
    this.pageNumber = pageNum;
    // if (pageNum < 1 || (this.pageNumber * AppConstant.PAGE_SIZE) >= this.totalItems) {
    //   return;
    // }

    this._getAllUsers(this.pageNumber, AppConstant.PAGE_SIZE);
  }


  async onDeleteUser(user: any) {
    const resp = await this.helperSvc.presentConfirmDialogue("Alert", 'Are you sure want to delete', "info" );

    if(resp) {
      this.authSvc.delete(user).subscribe(
        (resp: any) => {
          if(resp.status == HttpStatus.OK) {
            this.helperSvc.presentAlert(resp.message, 'success')

          this._getAllUsers();

          } else {
            // this.helperSvc.presentAlert(resp.message, 'info')
          }


        },
        (error: HttpErrorResponse) => {
          // this.helperSvc.dismissLoader();
          const errorMessage = error.error?.message || 'An unknown error occurred';
          // this.helperSvc.presentAlert(errorMessage , 'error')
        }
      )
    }
  }

 

  // onEditSubjectClicked(user: any) {
  //   const userId = user.id
  //   this.router.navigate(['/admin/add-user'], { queryParams: { id: userId } });
  // }

  // async onDeleteSubjectClicked(user) {
  //   await this.authSvc.deleteUser(user);
  //   await this._getAllUsers('')
  // }


  // async onRoleChanged(user:any , ev: any) {
  //   const role = ev.target.value;
  //   try {
  //     await this.authSvc.changeRole(user, role);
  //     this.helperSvc.presentAlert(`Role successfully changed for ${user.email}`, 'success')
  //   } catch (error) {

  //   } finally {
  //     // await loader.dismiss();
  //   }
    
  // }

  // async onStatusChanged(user:IUser, ev: any) {
  //   // const loader = await this.helperSvc.loader;
  //   // await loader.present();

  //   const status = ev.target.value;
  //   try {
  //     await this.authSvc.changeStatus(user, status);
  //     this.helperSvc.presentAlert(`Status successfully changed to ${status} for ${user.email}`, 'success')
  //   } catch (error) {
      
  //   } finally {
  //     // await loader.dismiss();
  //   }
  // }

  private async _getAllUsers(pageNumber: number = 1, pageSize: number = 10) {
    this.authSvc.getAllUsers(pageNumber, pageSize).subscribe(
        (resp: any) => {
          if(resp.status == HttpStatus.OK) {
            this.users = resp.data;
            this.totalItems = resp.totalItems;  
             this.users.forEach((user: any) => {
              user.roles.forEach((role: any) => {
                this.permissions = role.permissions;
              });
             
            });
            console.log(this.permissions[0]);
            
          } else {
            // this.helperSvc.presentAlert(resp.message, 'info')
          }
        },
        (error: HttpErrorResponse) => {
          // this.helperSvc.dismissLoader();
          const errorMessage = error.error?.message || 'An unknown error occurred';
          // this.helperSvc.presentAlert(errorMessage , 'error')
        }
    )
  }

}
