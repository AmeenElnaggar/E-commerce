import { Component } from '@angular/core';
import { NewsletterBoxComponent } from '../../../../Shared/components/newsletter-box/newsletter-box.component';
import { SectionTitleComponent } from '../../../../Shared/components/section-title/section-title.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [NewsletterBoxComponent, SectionTitleComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {}
