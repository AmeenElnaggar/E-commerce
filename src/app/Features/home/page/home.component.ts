import { Component } from '@angular/core';
import { HeroComponent } from '../components/hero/hero.component';
import { LatestcollectionComponent } from '../components/latest-collection/latestcollection.component';
import { BestSellersComponent } from '../components/best-sellers/best-sellers.component';
import { OurpolicyComponent } from '../components/ourpolicy/ourpolicy.component';
import { NewsletterBoxComponent } from '../components/newsletter-box/newsletter-box.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    LatestcollectionComponent,
    BestSellersComponent,
    OurpolicyComponent,
    NewsletterBoxComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
