import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'day'
})
export class DayPipe implements PipeTransform {
  transform(fecha: string): string {
    if (fecha && fecha.length >= 2) {
      return fecha.substring(0, 2);
    }
    return '';
  }
}
