import { Injectable } from "@angular/core";

/**
 * Stores constant values for use across the app
 */
@Injectable({
  providedIn: 'root'
})
export class Constants {
    readonly apiRoot: string = 'http://api.ratings.food.gov.uk';
    readonly authoritiesPath: string = `${this.apiRoot}/Authorities`;
    readonly establishmentsPath: string = `${this.apiRoot}/Establishments`;
}