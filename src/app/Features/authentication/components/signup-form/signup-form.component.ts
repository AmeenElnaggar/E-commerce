import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ValidationService } from '../../services/validation.service';

import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, AsyncPipe],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css',
})
export class SignupFormComponent {
  private validationService = inject(ValidationService);

  myForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.email,
        Validators.maxLength(50),
      ],
    }),
    passwords: new FormGroup(
      {
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
        confirmPassword: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
      },
      {
        validators: [
          this.validationService.equalValues('password', 'confirmPassword'),
        ],
      }
    ),
    phone: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(16),
      ],
    }),
  });
  error$: Observable<boolean> = this.validationService.signupError$;
  successfull$: Observable<boolean> = this.validationService.signupSuccess$;

  get emailIsInvalid() {
    return this.validationService.controlFieldIsInvalid(this.myForm, 'email');
  }

  get passwordsIsEqual() {
    return (
      !this.myForm.controls.passwords.valid &&
      this.myForm.controls.passwords.controls.confirmPassword.dirty
    );
  }

  onSubmit() {
    this.validationService.submitSignup(this.myForm);
  }
}
