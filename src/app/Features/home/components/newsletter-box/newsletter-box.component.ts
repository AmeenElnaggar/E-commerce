import { Component, ElementRef, viewChild } from '@angular/core';

@Component({
  selector: 'app-newsletter-box',
  standalone: true,
  imports: [],
  templateUrl: './newsletter-box.component.html',
  styleUrl: './newsletter-box.component.css',
})
export class NewsletterBoxComponent {
  myForm = viewChild<ElementRef<HTMLFormElement>>('form');
  onSubmit(event: MouseEvent) {
    event.preventDefault();
    this.myForm()?.nativeElement.reset();
  }
}
