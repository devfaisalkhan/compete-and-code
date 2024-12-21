import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstant } from '../../universal/app-constant';
import { IResponse } from '../../universal/shared.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {
  
  constructor(
    private http: HttpClient
  ) {
  }

  register(data: any): Observable<IResponse<any>> {
    return this.http.post<any>(`${AppConstant.BASE_API_URL}/auth/register`, data);
  }

  delete(data: any): Observable<IResponse<any>> {
    return this.http.post<any>(`${AppConstant.BASE_API_URL}/user/delete`, data);
  }

  login(data: any): Observable<IResponse<any>> {
    return this.http.post<any>(`${AppConstant.BASE_API_URL}/auth/authenticate`, data);
  }

  getAllUsersCount(): Observable<number> {

    return this.http.get<any>(`${AppConstant.BASE_API_URL}/user/getAllUsersCount`);
  }

  getAllUsers(): Observable<IResponse<any>> {
    return this.http.get<any>(`${AppConstant.BASE_API_URL}/user/getAllUsers`);
  }

  getNewAccessToken(refreshToken: string): Observable<number> {
    return this.http.post<any>(`${AppConstant.BASE_API_URL}/auth/getNewAccessToken`, {refreshToken: refreshToken});
  }


  private prepareHeaders(args?: HttpParams) {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('access_token');
    if(token) {
      headers = headers.append('Authorization', `Bearer ${token}`);            
    }
    return headers;
  }
}


export class HttpParams {
  url?: string
  body?: any
  errorCallback?: any;
  ignoreContentType?: boolean
  overrideUrl?: boolean
  httpHeaders?: HttpHeaders
}
