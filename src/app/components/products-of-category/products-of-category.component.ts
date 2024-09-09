import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-of-category',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './products-of-category.component.html',
  styleUrl: './products-of-category.component.scss',
})
export class ProductsOfCategoryComponent implements OnInit {
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _CartService = inject(CartService);

  productList: IProduct[] = [];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.productList = this._CategoriesService.productListOfSpecificCategory;
  }

  addProductToCart(id: string): void {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this._CartService.numberOfCartItem.set(res.numOfCartItems);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1500,
        });
      },
    });
  }
}
