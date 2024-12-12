import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstant } from '../../universal/app-constant';
import { IResponse } from '../../universal/shared.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {
  
  constructor(private http: HttpClient) {
  }

  register(data: any): Observable<IResponse<any>> {
    return this.http.post<any>(`${AppConstant.BASE_API_URL}/user/register`, data);
  }

  login(data: any): Observable<IResponse<any>> {
    return this.http.post<any>(`${AppConstant.BASE_API_URL}/user/authenticate`, data);
  }
}
