import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  loginAction,
  signupAction,
} from '../../../Store/actions/authentication.action';
import {
  selectAuthErrorSelector,
  selectAuthUserSelector,
} from '../../../Store/selectors/authentication.selector';
import { Router } from '@angular/router';
import { NavbarService } from '../../../Shared/services/navbar.service';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  private store = inject(Store);
  // private navbarService = inject;
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  error = signal<string>('');
  successfull = signal<string>('');

  controlFieldIsInvalid(form: FormGroup, controlName: string) {
    const control = form.get(controlName)!;
    return control.dirty && control.touched && control.invalid;
  }

  equalValues(controlName1: string, controlName2: string) {
    return (control: AbstractControl) => {
      const val1 = control.get(controlName1)?.value;
      const val2 = control.get(controlName2)?.value;

      if (val1 === val2) {
        return null;
      }

      return { valuesNotEqual: true };
    };
  }

  submitLogin(form: FormGroup) {
    localStorage.setItem(
      'User',
      JSON.stringify({ email: form.value.email, password: form.value.password })
    );

    let getUserData: any = localStorage.getItem('User');
    if (getUserData) {
      getUserData = JSON.parse(getUserData);
      console.log('Data Added To Local Storage ', getUserData);
      this.store.dispatch(loginAction({ userData: getUserData }));
      this.navigateToHome();
    }
  }

  navigateToHome() {
    this.store.select(selectAuthUserSelector).subscribe((res) => {
      if (res) {
        this.router.navigate(['/home'], { replaceUrl: true });
      }
    });
  }

  submitSignup(form: FormGroup) {
    localStorage.setItem(
      'User',
      JSON.stringify({
        name: form.value.name,
        email: form.value.email,
        password: form.value.passwords.password,
        rePassword: form.value.passwords.confirmPassword,
        phone: form.value.phone,
      })
    );
    let getUserData: any = localStorage.getItem('User');
    if (getUserData) {
      getUserData = JSON.parse(getUserData);
      this.store.dispatch(signupAction({ userData: getUserData }));
      this.navigateToHome();
    }
  }
}
