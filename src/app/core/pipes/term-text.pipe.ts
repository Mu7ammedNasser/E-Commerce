import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'termText',
  standalone: true,
})
export class TermTextPipe implements PipeTransform {
  transform(value: string, terms: number): string {
    return value.split(' ', terms).join(' ');
  }
}
