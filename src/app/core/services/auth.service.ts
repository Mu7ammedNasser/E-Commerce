import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _HttpClient = inject(HttpClient);
  private readonly _Router = inject(Router);

  userData: any = '';

  setRegisterForm(data: object): Observable<any> {
    return this._HttpClient.post(
      `${enviroment.baseURl}/api/v1/auth/signup`,
      data
    );
  }

  setloginForm(data: object): Observable<any> {
    return this._HttpClient.post(
      `${enviroment.baseURl}/api/v1/auth/signin`,
      data
    );
  }

  saveUserData(): void {
    if (localStorage.getItem('userToken') !== null) {
      this.userData = jwtDecode(localStorage.getItem('userToken')!);

      console.log(this.userData);
    }
  }

  logOut(): void {
    localStorage.removeItem('userToken');
    this.userData = null;

    this._Router.navigate(['/login']);
  }

  setVerifiyEmail(data: string): Observable<any> {
    return this._HttpClient.post(
      `${enviroment.baseURl}/api/v1/auth/forgotPasswords`,
      data
    );
  }
  setVerifiyCode(data: string): Observable<any> {
    return this._HttpClient.post(
      `${enviroment.baseURl}/api/v1/auth/verifyResetCode`,
      data
    );
  }
  resetPassword(data: string): Observable<any> {
    return this._HttpClient.put(
      `${enviroment.baseURl}/api/v1/auth/resetPassword`,
      data
    );
  }
}
