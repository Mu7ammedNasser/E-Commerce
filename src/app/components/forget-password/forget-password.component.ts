import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  step: number = 1;

  verifiyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  verifiyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
  });

  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    newPassword: new FormControl(null, [
      Validators.pattern(/^\w{6,}$/),
      Validators.required,
    ]),
  });

  verifiyEmailSubmit(): void {
    this._AuthService.setVerifiyEmail(this.verifiyEmail.value).subscribe({
      next: (res) => {
        if (res.statusMsg === 'success') {
          this.step = 2;
        }
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  verifiyCodeSubmit(): void {
    this._AuthService.setVerifiyCode(this.verifiyCode.value).subscribe({
      next: (res) => {
        if (res.status === 'Success') {
          this.step = 3;
        }
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  verifiyResetSubmit(): void {
    this._AuthService.resetPassword(this.resetPassword.value).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('userToken', res.token);
        this._Router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
