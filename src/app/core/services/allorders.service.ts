import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AllordersService {
  constructor(private _HttpClient: HttpClient) {}

  getUserOrder(userId: string): Observable<any> {
    return this._HttpClient.get(
      `${enviroment.baseURl}/api/v1/orders/user/${userId}`
    );
  }
}
