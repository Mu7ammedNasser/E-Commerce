import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ICategory } from '../../core/interfaces/icategory';
import { IProduct } from '../../core/interfaces/iproduct';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { TermTextPipe } from '../../core/pipes/term-text.pipe';
import { CartService } from '../../core/services/cart.service';
import { CategoriesService } from '../../core/services/categories.service';
import { ProductsService } from '../../core/services/products.service';
import { NgClass } from '@angular/common';
import { WishListService } from '../../core/services/wish-list.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CarouselModule,
    RouterLink,
    TermTextPipe,
    SearchPipe,
    FormsModule,
    NgClass,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _CartService = inject(CartService);
  private readonly _NgxSpinnerService = inject(NgxSpinnerService);
  private readonly _WishListService = inject(WishListService);

  searchValue: string = '';

  productList: IProduct[] = [];

  categoriesList: ICategory[] = [];

  customOptionsCategory: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="fa-solid fa-backward"></i>',
      '<i class="fa-solid fa-forward"></i>',
    ],
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,

    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };

  customOptionsMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="fa-solid fa-backward"></i>',
      '<i class="fa-solid fa-forward"></i>',
    ],
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,

    items: 1,
    nav: true,
  };

  productSub!: Subscription;
  produCat!: Subscription;

  hasFraction(num: number): boolean {
    return num !== Math.floor(num);
  }

  ngOnInit(): void {
    this._NgxSpinnerService.show();
    this.produCat = this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.categoriesList = res.data;
        this._NgxSpinnerService.hide();
      },
    });

    this.productSub = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.productList = res.data;
      },
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.productSub?.unsubscribe();
    this.produCat?.unsubscribe();
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
          timer: 2000,
        });
      },
    });
  }

  getUserWishList(): void {
    this._WishListService.gatLoggedUserWishList().subscribe({
      next: (res) => {
        console.log(res);
        this._WishListService.userWishList = res.data.map(
          (item: any) => item.product.id
        );
        localStorage.setItem(
          'userWishList',
          JSON.stringify(this._WishListService.userWishList)
        );
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
}
