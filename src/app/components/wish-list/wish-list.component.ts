import { Component, inject, OnInit } from '@angular/core';
import { WishListService } from '../../core/services/wish-list.service';
import { IWishList } from '../../core/interfaces/iwish-list';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss',
})
export class WishListComponent implements OnInit {
  private readonly _WishListService = inject(WishListService);
  private readonly _CartService = inject(CartService);

  isLoading = true;

  productDetails: IWishList[] = [];

  ngOnInit(): void {
    this._WishListService.gatLoggedUserWishList().subscribe({
      next: (res) => {
        console.log(res.data);
        this.productDetails = res.data;
        this.isLoading = false;
      },
    });
  }

  removeProduct(productId: string): void {
    // Show the confirmation dialog first
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to remove this item from your wishlist!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // If the user confirms, proceed to delete the item
        this._WishListService.removeProductFromWishList(productId).subscribe({
          next: (res) => {
            console.log(res);
            // Remove the product from the local array
            this.productDetails = this.productDetails.filter(
              (product) => product.id !== productId
            );

            this._WishListService.userWishList =
              this._WishListService.userWishList.filter(
                (id) => id !== productId
              );
            localStorage.setItem(
              'userWishList',
              JSON.stringify(this._WishListService.userWishList)
            );
            // Show success alert
            Swal.fire({
              title: 'Removed!',
              text: 'Your item has been removed from the wishlist.',
              icon: 'success',
            });
          },
          error: () => {
            // Show error alert in case of failure
            Swal.fire({
              title: 'Error!',
              text: 'An error occurred while removing the item.',
              icon: 'error',
            });
          },
        });
      }
    });
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

  isInWishList(productId: string): boolean {
    return this._WishListService.userWishList.includes(productId);
  }
}
