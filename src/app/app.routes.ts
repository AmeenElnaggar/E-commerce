import { Routes } from '@angular/router';
import { HomeComponent } from './Features/home/page/home.component';
import { CollectionComponent } from './Features/collection/page/collection/collection.component';
import { ProductPageComponent } from './Features/product/pages/product/product-page.component';
import { CartComponent } from './Features/cart/page/cart/cart.component';
import { LoginComponent } from './Features/authentication/pages/login/login/login.component';
import { SignupComponent } from './Features/authentication/pages/signup/signup/signup.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  { path: 'home', component: HomeComponent },
  { path: 'product/:productId', component: ProductPageComponent },
  { path: 'collection', component: CollectionComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
