import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _OrdersService = inject(OrdersService);

  private readonly _Router = inject(Router);

  cartId: string | null = '';

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get('id');
      },
    });
  }

  orders: FormGroup = new FormGroup({
    details: new FormControl(null, [
      Validators.required,
      Validators.minLength(10),
    ]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
    city: new FormControl(null, [
      Validators.required,
      Validators.minLength(10),
    ]),
  });

  orderSubmit(): void {
    if (this.orders.valid) {
      console.log(this.orders.value);
      console.log(this.orders);
      console.log(this.cartId);

      this._OrdersService.checkOut(this.cartId, this.orders.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.status === 'success') {
            window.open(res.session.url, '_self');
          }
        },
        error(err) {
          console.log(err);
        },
      });
    } else {
      this.orders.markAllAsTouched();
    }
  }
}
