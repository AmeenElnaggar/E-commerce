import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CollectionService {
  isVisible = signal<boolean>(false);

  onOpenSearchBarVisible() {
    this.isVisible.set(true);
  }

  onCloseSearchBarVisible() {
    this.isVisible.set(false);
  }
}
