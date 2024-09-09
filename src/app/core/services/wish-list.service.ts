import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  constructor(private _HttpClient: HttpClient) {}

  userWishList: string[] = [];

  addProductToWishList(id: string): Observable<any> {
    return this._HttpClient.post(`${enviroment.baseURl}/api/v1/wishlist`, {
      productId: id,
    });
  }

  gatLoggedUserWishList(): Observable<any> {
    return this._HttpClient.get(`${enviroment.baseURl}/api/v1/wishlist`);
  }

  removeProductFromWishList(productId: string): Observable<any> {
    return this._HttpClient.delete(
      `${enviroment.baseURl}/api/v1/wishlist/${productId}`
    );
  }
}
