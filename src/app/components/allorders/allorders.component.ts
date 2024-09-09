import { Component, inject, OnInit } from '@angular/core';
import { AllordersService } from '../../core/services/allorders.service';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { Iallorders } from '../../core/interfaces/iallorders';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, NgClass],
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss'], // Corrected property name
})
export class AllordersComponent implements OnInit {
  private readonly _AllordersService = inject(AllordersService);
  orders: Iallorders[] = [];
  userData: any = {};

  isLoading: boolean = true;

  ngOnInit(): void {
    this.saveUserData();
  }

  saveUserData(): void {
    const token = localStorage.getItem('userToken');
    if (token) {
      this.userData = jwtDecode(token);
      console.log(this.userData.id);

      // Now that userData is set, fetch user orders
      this.getUserOrders(this.userData.id);
    }
  }

  getUserOrders(id: string): void {
    this._AllordersService.getUserOrder(id).subscribe({
      next: (res) => {
        console.log(res);
        this.orders = res; // Assuming res.data contains the list of orders
        this.isLoading = false;
      },
    });
  }
}
