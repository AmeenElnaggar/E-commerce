import { Component, inject } from '@angular/core';
import { HeroComponent } from '../components/hero/hero.component';
import { NewsletterBoxComponent } from '../../../Shared/components/newsletter-box/newsletter-box.component';
import { OurpolicyComponent } from '../components/ourpolicy/ourpolicy.component';
import { BestSellersComponent } from '../components/best-sellers/best-sellers.component';
import { LatestcollectionComponent } from '../components/latest-collection/latestcollection.component';
import { ValidationService } from '../../authentication/services/validation.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { SpinnerComponent } from '../../../Shared/components/spinner/spinner.component';
import { UiService } from '../../../Shared/services/ui.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    OurpolicyComponent,
    NewsletterBoxComponent,
    BestSellersComponent,
    AsyncPipe,
    LatestcollectionComponent,
    SpinnerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private uiService = inject(UiService);

  isLoading$: Observable<boolean> = this.uiService.isLoading$;
  isError$: Observable<boolean> = this.uiService.isError$;
}
