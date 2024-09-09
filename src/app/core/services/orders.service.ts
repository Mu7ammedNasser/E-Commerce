import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private _HttpClient: HttpClient) {}

  checkOut(cartId: string | null, shippingDetails: object): Observable<any> {
    return this._HttpClient.post(
      `${enviroment.baseURl}/api/v1/orders/checkout-session/${cartId}?url=${enviroment.urlServer}`,
      {
        shippingAddress: shippingDetails,
      }
    );
  }
}
