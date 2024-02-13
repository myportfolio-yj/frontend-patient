import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayTranslate'
})
export class DayTranslatePipe implements PipeTransform {
  transform(value: string): string {
    if (value === undefined) {
      return '';
    }
    switch (value.toUpperCase()) {
      case 'MON':
        return 'Lun';
      case 'TUE':
        return 'Mar';
      case 'WED':
        return 'Mié';
      case 'THU':
        return 'Jue';
      case 'FRI':
        return 'Vie';
      case 'SAT':
        return 'Sáb';
      case 'SUN':
        return 'Dom';
      default:
        return value; // Devuelve el valor original si no es un día de la semana conocido
    }
  }
}
