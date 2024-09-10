import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { IProductDetails } from '../../core/interfaces/iproduct-details';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import Swal from 'sweetalert2';
import { WishListService } from '../../core/services/wish-list.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule, NgClass],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _WishListService = inject(WishListService);

  detailsList: IProductDetails | null = null;

  customOptionsDetails: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true,
  };

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        console.log(params.get('id'));
        let id = params.get('id');
        this._ProductsService.getSpecificProduct(id).subscribe({
          next: (res) => {
            console.log(res.data);
            this.detailsList = res.data;
          },
        });
      },
    });
  }

  addProductToCartD(id: string): void {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this._CartService.numberOfCartItem.set(res.numOfCartItems);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 2000,
        });
      },
    });
  }

  isInWishList(productId: string): boolean {
    return this._WishListService.userWishList.includes(productId);
  }

  addProductToWishList(productId: string): void {
    if (this.isInWishList(productId)) {
      this._WishListService.removeProductFromWishList(productId).subscribe({
        next: (res) => {
          console.log(res);
          this._WishListService.userWishList =
            this._WishListService.userWishList.filter((id) => id !== productId);
          localStorage.setItem(
            'userWishList',
            JSON.stringify(this._WishListService.userWishList)
          );
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Product removed from wishlist',
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
    } else {
      this._WishListService.addProductToWishList(productId).subscribe({
        next: (res) => {
          console.log(res);
          this._WishListService.userWishList.push(productId);
          localStorage.setItem(
            'userWishList',
            JSON.stringify(this._WishListService.userWishList)
          );
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
