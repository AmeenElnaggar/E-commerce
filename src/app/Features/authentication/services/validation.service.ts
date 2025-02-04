import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  loginAction,
  signupAction,
  signupStatusAction,
} from '../../../Store/actions/authentication.action';
import {
  loginErrorSelector,
  authTokenSelector,
  signupErrorSelector,
  signupSuccesSelector,
} from '../../../Store/selectors/authentication.selector';
import { Router } from '@angular/router';
import { NavbarService } from '../../../Shared/services/navbar.service';
import { Observable, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  private store = inject(Store);
  private router = inject(Router);

  loginError$: Observable<boolean> = this.store.select(loginErrorSelector);

  signupError$: Observable<boolean> = this.store.select(signupErrorSelector);
  signupSuccess$: Observable<boolean> = this.store.select(signupSuccesSelector);

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
      'UserLogin',
      JSON.stringify({ email: form.value.email, password: form.value.password })
    );

    let getUserData: any = localStorage.getItem('UserLogin');
    if (getUserData) {
      getUserData = JSON.parse(getUserData);
      this.store.dispatch(loginAction({ userData: getUserData }));
      this.store.select(authTokenSelector).subscribe((res) => {
        if (res) {
          this.navigateToLastPage();
        }
      });
    }
  }

  navigateToLastPage() {
    const lastPage = localStorage.getItem('lastPage') || '/home';
    this.store.select(authTokenSelector).subscribe((res) => {
      if (res) {
        localStorage.removeItem('lastPage');
        this.router.navigateByUrl(lastPage, { replaceUrl: true });
      }
    });
  }

  submitSignup(form: FormGroup) {
    localStorage.setItem(
      'Signup Data',
      JSON.stringify({
        name: form.value.name,
        email: form.value.email,
        password: form.value.passwords.password,
        rePassword: form.value.passwords.confirmPassword,
        phone: form.value.phone,
      })
    );
    let getUserData: any = localStorage.getItem('Signup Data');
    if (getUserData) {
      getUserData = JSON.parse(getUserData);
      this.store.dispatch(signupAction({ userData: getUserData }));
      this.signupSuccess$.subscribe((res) => {
        if (res) {
          form.reset();
          localStorage.removeItem('Signup Data');
          timer(1000).subscribe(() => {
            this.router.navigate(['/login'], { replaceUrl: true }),
              this.store.dispatch(
                signupStatusAction({ isError: false, isSuccess: false })
              );
          });
        }
      });
    }
  }

  // onReload() {
  //   // let getUserData: any = localStorage.getItem('UserLogin');
  //   // const userToken: any = localStorage.getItem('token');
  //   // if (userToken) {
  //   //   getUserData = JSON.parse(getUserData);
  //   //   this.store.dispatch(loginAction({ userData: getUserData }));
  //   // }
  // }
}
