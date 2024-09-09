import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss',
})
export class NavBlankComponent implements OnInit {
  readonly _AuthService = inject(AuthService);
  private readonly _CartService = inject(CartService);

  counter: Signal<number> = computed(() =>
    this._CartService.numberOfCartItem()
  );

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this._CartService.getProductOfCart().subscribe({
      next: (res) => {
        console.log(res);
        this._CartService.numberOfCartItem.set(res.numOfCartItems);
      },
    });
  }

  // kickOut(): void {
  //   this._AuthService.logOut
  // }
}
