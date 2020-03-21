import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterStatus: string, propName: string): any {
    const outputArray = [];
    if (value.length === 0 || filterStatus.length === 0) {
      return value;
    }
    for (const item of value) {
      if (item[propName] === filterStatus) {
        outputArray.push(item);
      }
    }
    return outputArray;
  }

}
