import { Component, inject, OnInit } from '@angular/core';
import { SearchComponent } from '../../components/search/search.component';
import { SearchBarDirective } from '../../directives/searchbar.directive';
import { FiltersComponent } from '../../components/filters/filters.component';
import { AllProductsService } from '../../../../Shared/services/allProducts.service';
import { RelevantCollectionsComponent } from '../../components/relevant-collections/relevant-collections.component';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [
    SearchComponent,
    SearchBarDirective,
    FiltersComponent,
    RelevantCollectionsComponent,
  ],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css',
})
export class CollectionComponent {
  private allProductsService = inject(AllProductsService);
}
