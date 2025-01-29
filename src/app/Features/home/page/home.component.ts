import { Component } from '@angular/core';
import { HeroComponent } from '../components/hero/hero.component';
import { NewsletterBoxComponent } from '../components/newsletter-box/newsletter-box.component';
import { OurpolicyComponent } from '../components/ourpolicy/ourpolicy.component';
import { BestSellersComponent } from '../components/best-sellers/best-sellers.component';
import { LatestcollectionComponent } from '../components/latest-collection/latestcollection.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    OurpolicyComponent,
    NewsletterBoxComponent,
    BestSellersComponent,
    LatestcollectionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
