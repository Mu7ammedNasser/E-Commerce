import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { IcartDetails } from '../../core/interfaces/icart-details';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly _CartService = inject(CartService);
  private readonly _Router = inject(Router);

  cartItems: IcartDetails = {} as IcartDetails;

  isLoading: boolean = true;

  ngOnInit(): void {
    this._CartService.getProductOfCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartItems = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching cart data', err);
        this.isLoading = false;
      },
    });
  }
  deleteItem(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this item from your cart!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._CartService.deleteSpecificCartItem(id).subscribe({
          next: (res) => {
            console.log(res);
            this.cartItems = res.data;
            this._CartService.numberOfCartItem.set(res.numOfCartItems);

            Swal.fire({
              title: 'Deleted!',
              text: 'Your item has been deleted.',
              icon: 'success',
            });
          },
        });
      }
    });
  }
  updateCount(id: string, newCount: number): void {
    this._CartService.updateProductCount(id, newCount).subscribe({
      next: (res) => {
        console.log(res);
        this.cartItems = res.data;
      },
    });
  }

  clearData() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to clear your cart!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, clear it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._CartService.clearCart().subscribe({
          next: (res) => {
            console.log(res);
            this.cartItems = {} as IcartDetails;
            this._CartService.numberOfCartItem.set(0);
            this._Router.navigate(['/home']);
          },
        });
      }
    });
  }
}
