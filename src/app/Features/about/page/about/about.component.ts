import { Component } from '@angular/core';
import { NewsletterBoxComponent } from '../../../../Shared/components/newsletter-box/newsletter-box.component';
import { SectionTitleComponent } from '../../../../Shared/components/section-title/section-title.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NewsletterBoxComponent, SectionTitleComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {}
