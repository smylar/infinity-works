Paul Brandon - 08/04/2019

This is an Angular 2 project, to install and run:

1. Download and install the LTS release of Node from https://nodejs.org/en/download/
2. Copy contents of zip file to a folder of your choice e.g. c:/infinity-works
3. Open command prompt and execute: npm install -g @angular/cli
4. Navigate to the folder we created, it should contain package.json and a folder named src
5. Execute command: npm install
6. Once the node dependencies are installed execute: ng test

This should execute Karma which will show the results of all the tests defined within the spec files

7. Close test using Ctrl^C in the command prompt.
8. Now execute: ng serve
9. Open your browser and navigate to localhost:4200/ratings

You should now be able to select authorities and see their ratings.


-----------

The app is a pretty basic UI that demonstrates the required component and interacts with the API endpoints, I haven't looked to put too much fluff around it. Angular probably isn't my greatest strength, but this is the technology that seemed most suited, seeing as we already have a backend.

Assumptions:
1.Authorities are not separated by country or scheme type.
2.The ratings shown in the instructions must appear in that order, including if there are none of that rating.
3.Additional ratings (where they appear) e.g. 'Awaiting Inspection' have been added to the end of the list and not ignored.
4.Percentage shown to 2 decimal places

Other:
I did consider pulling available ratings from the the Ratings endpoint and filtering by the scheme type retrieved from the Authority record.
However, "exempt" and "awaiting inspection" appear to be only listed on type 2 (Scotland) schemes, yet these ratings will appear for type 1 schemes. 
That's government API's for you! This is why the ratings have not been retrieved from that endpoint.