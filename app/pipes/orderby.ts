//The pipe class implements the PipeTransform interface's transform method that accepts an input value and an optional array of parameters and returns the transformed value.

import { Pipe, PipeTransform } from '@angular/core';

//We tell Angular that this is a pipe by applying the @Pipe decorator which we import from the core Angular library.

@Pipe({name: 'orderby'})

export class OrderByPipe implements PipeTransform {
  transform(array:Array<any>, args?) {

    // Check if array exists, in this case array contains articles and args is an array that has 1 element : !id

    if(array) {

      // get the first element

      let orderByName = args;
      let byVal = 1;

      // check if exclamation point

      if(orderByName.charAt(0) == "!") {

        // reverse the array

        byVal = -1;
        orderByName = orderByName.substring(1)
      }

      array.sort((a: any, b: any) => {
        if(a[orderByName] < b[orderByName]) {
          return -1*byVal;
        } else if (a[orderByName] > b[orderByName]) {
          return (1 * byVal);
        } else {
          return 0;
        }
      });
      return array;
    }
  }
}
