import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagesPipe',
  standalone: true,
})
export class ImagesPipe implements PipeTransform {
  transform(value: string[]) {
    if (value) {
      return [...value].slice(0, 4);
    } else {
      return value;
    }
  }
}
