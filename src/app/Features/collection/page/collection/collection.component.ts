import { Component } from '@angular/core';
import { FiltersComponent } from '../../components/filters/filters.component';
import { RelevantCollectionsComponent } from '../../components/relevant-collections/relevant-collections.component';
import { SearchComponent } from '../../components/search/search.component';
import { SearchDirective } from '../../directives/searchbar.directive';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [
    FiltersComponent,
    SearchDirective,
    RelevantCollectionsComponent,
    SearchComponent,
  ],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css',
})
export class CollectionComponent {}
