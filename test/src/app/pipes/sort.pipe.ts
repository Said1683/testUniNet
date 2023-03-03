import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
//pipe, ordena los datos obtenidos
export class SortPipe implements PipeTransform {

  transform(array: Array<any>, args: string): Array<any> {
    return array.sort((a: any, b: any) => {
      if (a[args] < b[args]) {
        return -1;
      } else if (a[args] > b[args]) {
        return 1;
      } else {
        return 0;
      }
    });
  }

}
