import { Pipe, PipeTransform } from '@angular/core';

const nombresMeses = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

@Pipe({
  name: 'month'
})
export class MonthPipe implements PipeTransform {

  transform(value: string): string {
    if (value === undefined) {
      return '';
    }
    if(value.length > 0 ){
      const partesFecha = value.split('/');
      const month = Number(partesFecha[1]);
      if (month >= 1 && month <= 12) {
        return nombresMeses[month - 1];
      } else {
        return 'Mes inválido';
      }
    }
    return '';
  }
}
