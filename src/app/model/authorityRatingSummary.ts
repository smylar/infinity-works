
/**
 * Collector class that collates ratings together
 */
export class AuthorityRatingSummary {
  ratings: Object;
  count: number;

    constructor(region: string) { 
        this.ratings = region == "Scotland" ? this.initialSetupScotland() : this.initialSetup();
        this.count = 0;
    }
    
    /**
     * Add another rating to this collection
     * N.B. Any additional ratings to the initial ones will be added to the end of the list
     * 
     * @param rating - The rating to collect
     */
    add(rating: string): AuthorityRatingSummary {
        let ratingValue = rating;
        if (!isNaN(Number(ratingValue))) {
            ratingValue = ratingValue + '-Star';
        }
        this.ratings[ratingValue] = undefined == this.ratings[ratingValue] ? 1 : this.ratings[ratingValue] + 1;
        this.count++;
        return this;
    }
    
    
    /**
     * For the setups below, I did consider pulling these from the the Ratings endpoint and filtering by the scheme type
     * retrieved from the Authority record.
     * However, "exempt" and "awaiting inspection" appear to be only listed on type 2 (Scotland) schemes, yet these ratings will appear for type 1 schemes. 
     * That's government API's for you!
     * Therefore I've gone with the coded setup below, which also allows easier controlling of the display order
     */
    
    private initialSetupScotland(): Object {
        return {
          'Pass' : 0,
          'Improvement Required' : 0,
          'Exempt' : 0
        };
      //may want to separate these out elsewhere 
    }
    
    private initialSetup(): Object {
        return {
            '5-Star' : 0,
            '4-Star' : 0,
            '3-Star' : 0,
            '2-Star' : 0,
            '1-Star' : 0,
            'Exempt' : 0
          };
    }
}