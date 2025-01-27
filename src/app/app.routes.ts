import { Routes } from '@angular/router';
import { HomeComponent } from './Features/home/page/home.component';
import { ProductPageComponent } from './Features/product/pages/product/product-page.component';
import { CollectionComponent } from './Features/collection/page/collection/collection.component';
import { CartPageComponent } from './Features/cart/pages/cart-page/cart-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  { path: 'home', component: HomeComponent },
  { path: 'product/:productId', component: ProductPageComponent },
  { path: 'collection', component: CollectionComponent },
  { path: 'cart', component: CartPageComponent },

  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
