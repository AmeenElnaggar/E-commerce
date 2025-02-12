import { Component, inject, OnInit } from '@angular/core';
import { SearchComponent } from '../../components/search/search.component';
import { SearchBarDirective } from '../../directives/searchbar.directive';
import { FiltersComponent } from '../../components/filters/filters.component';
import { RelevantCollectionsComponent } from '../../components/relevant-collections/relevant-collections.component';
import { CollectionsService } from '../../../../Shared/services/collections.service';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../Store/store';
import { fetchModifiedCollectionAction } from '../../../../Store/actions/collections.action';

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
  private store = inject(Store<StoreInterface>);
  private collectionService = inject(CollectionsService);

  ngOnInit() {
    this.store.dispatch(fetchModifiedCollectionAction({}));
    this.collectionService.updateMetaData();
  }
}
