import { Pipe, PipeTransform } from '@angular/core';

/**
 * Simple pipe that will generate a percentage value from a value and count
 * Usage:
 * 
 * value | asPercentageOf: count
 * e.g.
 * 1 | asPercentageOf: 10
 * 
 * gives a result of 10.
 * N.B. Decimal places are not limited here and the % symbol is not added
 * this is meant to be passed through other formatting pipes like 'number'
 * 
 */
@Pipe({
  name: 'asPercentageOf'
})
export class AspercentagePipe implements PipeTransform {

  transform(value: number, of: number): any {
    if (isNaN(value) || isNaN(of) || of == 0) {
        return 0;
    }
    return (value / of) * 100;
  }

}
