import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { AppInjector } from "./app-injector";
import { NgxPubSubService } from "./pub-sub";

import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
    providedIn: 'root'
  })
export class HelperService {
  protected pubSub!: NgxPubSubService;
  private _loaderInstance: any;

   constructor(
   ) { 
    setTimeout(() => {
    });
   }
   
   presentLoader(text: string) {
    this._loaderInstance = <any>Swal.fire({
      title: text,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  }

  dismissLoader() {
    if (this._loaderInstance) {
      this._loaderInstance.close();
      this._loaderInstance = null;
    }
  }
  

  // presentConfirationDialogue() {
  //   Swal.fire({
  //     title: 'Are you sure',
  //     text: "You wan to logout?",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: 'var(--color-primary)',
  //     cancelButtonColor: '#d33 !important',
  //     confirmButtonText: 'Yes'
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         Swal.fire(
  //           'Logged Out!',
  //           'User successfully logged out.',
  //           'success'
  //         )

  //         this.pubSub.publishEvent(UserConstant.EVENT_USER_LOGGEDOUT, { 
  //           clearCache: true
  //         });
  //       }
  //   })
  // }

  presentConfirmDialogue(title: string, text: string, icon: SweetAlertIcon ) {
    return new Promise( (resolve ) => {
      Swal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(result.isConfirmed)
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          resolve(result.isConfirmed)
        }
      });
    })

  }

  presentAlert(text: string, icon: SweetAlertIcon, timer = 1500) {
    Swal.fire({
      position: 'center',
      icon: icon ,
      title: text,
      showConfirmButton: false,
      timer: timer
    })
  }
}
