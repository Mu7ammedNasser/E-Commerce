import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { enviroment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // private readonly _HttpClient = inject(HttpClient);

  constructor(private _HttpClient: HttpClient) {}

  // numberOfCartItem: BehaviorSubject<number> = new BehaviorSubject(0);
  numberOfCartItem: WritableSignal<number> = signal(0);

  addProductToCart(id: string): Observable<any> {
    return this._HttpClient.post(
      `${enviroment.baseURl}/api/v1/cart`,

      {
        productId: id,
      }
    );
  }

  getProductOfCart(): Observable<any> {
    return this._HttpClient.get(`${enviroment.baseURl}/api/v1/cart`);
  }

  deleteSpecificCartItem(id: string): Observable<any> {
    return this._HttpClient.delete(`${enviroment.baseURl}/api/v1/cart/${id}`);
  }

  updateProductCount(id: string, newCount: number): Observable<any> {
    return this._HttpClient.put(`${enviroment.baseURl}/api/v1/cart/${id}`, {
      count: newCount,
    });
  }

  clearCart(): Observable<any> {
    return this._HttpClient.delete(`${enviroment.baseURl}/api/v1/cart`);
  }
}
