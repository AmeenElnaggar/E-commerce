import { Component, effect, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ValidationService } from '../../services/validation.service';
import { AuthStatusService } from '../../../../Shared/services/authStatus.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../Store/store';
import { loginErrorSelector } from '../../../../Store/selectors/authentication.selector';
import { SpinnerComponent } from '../../../../Shared/components/spinner/spinner.component';
import { spinnerOfUiSelector } from '../../../../Store/selectors/ui.selector';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, AsyncPipe, SpinnerComponent, NgIf],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  private store = inject(Store<StoreInterface>);
  private validationService = inject(ValidationService);
  private authStatusService = inject(AuthStatusService);

  Error$: Observable<boolean> = this.validationService.loginError$;
  isLoading$: Observable<boolean> = this.validationService.isLoading$;
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

  get emailIsInvalid() {
    return this.validationService.controlFieldIsInvalid(this.myForm, 'email');
  }

  onSubmit() {
    this.validationService.submitLogin(this.myForm);
  }
}
