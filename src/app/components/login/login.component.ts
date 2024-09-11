import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
  private readonly _AuthService = inject(AuthService);

  loginSub!: Subscription;

  msgError: string | boolean = '';
  messageSuccess: boolean = false;
  isLoading: boolean = false;

  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.email, Validators.required]],
    password: [null, [Validators.pattern(/^\w{6,}$/), Validators.required]],
  });

  loginSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loginSub = this._AuthService
        .setloginForm(this.loginForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.message == 'success') {
              this.msgError = false;
              this.messageSuccess = true;
              setTimeout(() => {
                // save token in local storagre

                localStorage.setItem('userToken', res.token);

                //decode token

                this._AuthService.saveUserData();

                // navigate to home
                this._Router.navigate(['/home']);
              }, 1000);
              this.isLoading = false;
            }
          },
          error: (err: HttpErrorResponse) => {
            this.isLoading = false;
            this.msgError = err.error.message;
          },
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.loginSub?.unsubscribe();
  }
}
