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
    return this.http.post<any>(`${AppConstant.BASE_API_URL}/auth/register`,data);
  }

  update(data: any): Observable<IResponse<any>> {
    return this.http.post<any>(`${AppConstant.BASE_API_URL}/user/update`,data);
  }

  uploadFile(data: any): Observable<IResponse<any>> {
    return this.http.post<any>(`${AppConstant.BASE_API_URL}/file-upload/upload`, data );
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

  getAllUsers(pageNumber?: number, pageSize?: number): Observable<IResponse<any>> {
    return this.http.get<any>(`${AppConstant.BASE_API_URL}/user/getAllUsers?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  getUserById(id: string): Observable<IResponse<any>> {
    return this.http.get<any>(`${AppConstant.BASE_API_URL}/user/${id}`);
  }

  getNewAccessToken(refreshToken: string): Observable<number> {
    return this.http.post<any>(`${AppConstant.BASE_API_URL}/auth/getNewAccessToken`, {refreshToken: refreshToken});
  }

  sendOtp(email: string): Observable<number> {
    return this.http.post<any>(`${AppConstant.BASE_API_URL}/otp/sendOtp`, {email});
  }

  verifyOtp(data: {otp: number, email: string}): Observable<number> {
    return this.http.post<any>(`${AppConstant.BASE_API_URL}/otp/verifyOtp`, data);
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
