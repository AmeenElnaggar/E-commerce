import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Core/components/navbar/navbar.component';
import { FooterComponent } from './Core/components/footer/footer.component';
import { Store } from '@ngrx/store';
import { StoreInterface } from './Store/store';
import { getCollectionAction } from './Store/actions/collection.action';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private store = inject(Store<StoreInterface>);
  ngOnInit() {
    this.store.dispatch(getCollectionAction());
  }
}
