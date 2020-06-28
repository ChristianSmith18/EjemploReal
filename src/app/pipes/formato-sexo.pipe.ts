import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoSexo',
})
export class FormatoSexoPipe implements PipeTransform {
  transform(idSexo: number): string {
    return idSexo === 1 ? 'Masculino' : 'Femenino';
  }
}
