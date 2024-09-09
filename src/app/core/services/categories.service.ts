import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroment } from '../environments/environment';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/iproduct';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  // private readonly _HttpClientModule = inject(HttpClient);

  constructor(private _HttpClient: HttpClient) {}

  productListOfSpecificCategory: IProduct[] = [];
  getAllCategories(): Observable<any> {
    return this._HttpClient.get(`${enviroment.baseURl}/api/v1/categories`);
  }

  getSpecificCategory(id: string): Observable<any> {
    return this._HttpClient.get(
      `${enviroment.baseURl}/api/v1/categories/${id}`
    );
  }
}
