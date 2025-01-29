import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  visible = signal<boolean>(true);

  setVisible() {
    this.visible.update((prevSate) => !prevSate);
  }
}
