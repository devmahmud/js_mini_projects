// Variables
const form = document.getElementById('request-quote');
const html = new HTMLUI();


// Event listeners
eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', function(){
        // Create the <option/> for the years
        html.displayYears();
    
    });
    // When the form is submitted
    form.addEventListener('submit', function(e){
        e.preventDefault();

        // Read the values from the Form
        const make = document.getElementById('make').value;
        const year = document.getElementById('year').value;
         
        // Read the value of a Radio button
        const level = document.querySelector('input[name="level"]:checked').value;

        // check that fields are not empty
        if(make === '' || year === '' || level === ''){
            html.displayError('All the fields are mandatory');
        }else{
            // Make a quotation
            const insurance = new Insurance(make, year, level);
            const price = insurance.calculateQuotation(insurance);

            // Print the Result from HTMLUI()

            // Clear the previous result before showing result
            const prevResult = document.querySelector('#result div');
            if(prevResult !== null){
                prevResult.remove();
            }

            html.showResults(price, insurance);
        }
    });
    
}