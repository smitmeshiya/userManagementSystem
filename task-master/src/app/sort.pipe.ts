import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any[], args: any[]): any {
    if (!value || !args) {
      return value;
    }

    const sortFeild = args[0];
    const sortDirection = args[1];
    let multiplier = -1;

    if(sortDirection === 'send'){
      multiplier = 1;
    }

    return value.sort((a:any, b:any)=>{
      if(a[sortFeild] < b[sortFeild]){
        return -1 * multiplier;
      }else if(a[sortFeild] > b[sortFeild]){
        return 1 * multiplier;
      }else{
        return 0;
      }
    })
  }

}
