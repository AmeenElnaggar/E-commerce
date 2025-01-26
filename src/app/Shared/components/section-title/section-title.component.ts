import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-title',
  standalone: true,
  imports: [],
  templateUrl: './section-title.component.html',
  styleUrl: './section-title.component.css',
})
export class SectionTitleComponent {
  title = input.required<{ text1: string; text2: string }>();
}
