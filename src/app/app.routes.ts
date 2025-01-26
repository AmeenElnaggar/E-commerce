import { Routes } from '@angular/router';
import { HomeComponent } from './Features/home/page/home.component';
import { ProductComponent } from './Shared/pages/product/product.component';
import { CollectionComponent } from './Features/collection/page/collection/collection.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  { path: 'home', component: HomeComponent },
  { path: 'product/:productId', component: ProductComponent },
  { path: 'collection', component: CollectionComponent },

  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
