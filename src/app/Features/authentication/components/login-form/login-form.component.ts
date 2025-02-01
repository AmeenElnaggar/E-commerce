import { Component, effect, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ValidationService } from '../../services/validation.service';
import { User } from '../../models/user.model';
import { NavbarService } from '../../../../Shared/services/navbar.service';
import { Store } from '@ngrx/store';
import { selectAuthUserSelector } from '../../../../Store/selectors/authentication.selector';
import { AsyncPipe } from '@angular/common';
import { SpinnerComponent } from '../../../../Shared/spinner/spinner.component';
import { AllProductsService } from '../../../../Shared/services/allProducts.service';
import { AuthStatusService } from '../../../../Shared/services/authStatus.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, AsyncPipe, SpinnerComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  private validationService = inject(ValidationService);
  private allProductsService = inject(AllProductsService);
  private authStatusService = inject(AuthStatusService);

  isError: string = '';

  constructor() {
    effect(() => {
      this.isError = this.authStatusService.error();
    });
  }

  myForm = new FormGroup({
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.email,
        Validators.maxLength(50),
      ],
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
      ],
    }),
  });

  ngOnInit() {
    let userData: any = localStorage.getItem('User');
    if (userData) {
      userData = JSON.parse(userData);
      this.myForm.controls.email.setValue(userData.email);
      this.myForm.controls.password.setValue(userData.password);
    }
    this.authStatusService.handleError();
<<<<<<< HEAD
    this.validationService.onReload();
=======
    // this.validationService.onReload();
>>>>>>> Authentication
  }

  get emailIsInvalid() {
    return this.validationService.controlFieldIsInvalid(this.myForm, 'email');
  }

  onSubmit() {
    this.validationService.submitLogin(this.myForm);
  }
}
