import { inject, Injectable, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreInterface } from '../../Store/store';
import { Observable } from 'rxjs';
import {
  errorOfUiSelector,
  spinnerOfUiSelector,
} from '../../Store/selectors/ui.selector';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private store = inject(Store<StoreInterface>);

  isLoading$: Observable<boolean> = this.store.select(spinnerOfUiSelector);
  isError$: Observable<boolean> = this.store.select(errorOfUiSelector);
}
