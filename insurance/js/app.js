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

// Objects
// Everything related to the quotation and calculations is Insurance
function Insurance(make, year, level){
    this.make = make;
    this.year = year;
    this.level = level;
}
// Calculate the price for the current quotation
Insurance.prototype.calculateQuotation = function(insurance){
    let price;
    const base = 2000;

    // Get the make
    const make = insurance.make;

    /**
     * 1. American = 15%
     * 2. Asian = 05%
     * 3. Europian = 35%
     */
    switch (make) {
        case '1':
            price = base * 1.15;
            break;
        case '2':
            price = base * 1.05;
            break;
        case '3':
            price = base * 1.35;
            break;

        default:
            break;
    }

    // Get the year
    const year = insurance.year;
    const difference = this.getYearDifference(year);

    // Each year the cost is going to be 3% cheaper
    price = price - ((difference*3) * price)/100;

    // Check the level of protection
    const level = insurance.level;
    price = this.calculateLevel(price, level);

    return Math.round(price);

}

// Returns the difference between year
Insurance.prototype.getYearDifference = function(year){
    return new Date().getFullYear() - year;
}

// Calculate the price according to the level
Insurance.prototype.calculateLevel = function(price, level){
    /**
     * Basic insurance is going to increase the value by 30%
     * Complete Insurance is going to increase the value by 50%
     */
    if(level == "basic"){
        price = price * 1.30;
    }else if(level == "complete"){
        price = price * 1.50;
    }
    return price;
}


// Everything related to the html
function HTMLUI(){ 
}

// Displays the latest 20 years in select
HTMLUI.prototype.displayYears = function(){
    // Max and Minimum years
    const max = new Date().getFullYear();
    const min = max - 20;

    // Generate the list of latest 20 years
    const selectYears = document.getElementById('year');

    for(let i=max ; i>min; i--){
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYears.appendChild(option);
    }
}

// Displays error in the UI
HTMLUI.prototype.displayError = function(message){
    // Create a div
    const div = document.createElement('div');
    div.classList.add('error');

    // Insert the message
    div.innerHTML = `<p>${message}</p>`;

    form.insertBefore(div,document.querySelector('.form-group'));

    setTimeout(function(){
        document.querySelector('.error').remove();
    },3000);
}

// Prints the result into html
HTMLUI.prototype.showResults = function(price, insurance){
    // Print the result
    const result = document.getElementById('result');
    
    // Create a div with the result
    const div = document.createElement('div');

    let make = insurance.make;

    switch (make) {
        case "1":
            make = "American";
            break;
        case "2":
            make = "Asian";
            break;
        case "3":
            make = "Europian";
            break;
        default:
            break;
    }

    div.innerHTML = `
        <p class="header">Summary</p>
        <p>Make: ${make}</p>
        <p>Year: ${insurance.year}</p>
        <p>Level: ${insurance.level}</p>
        <p class="total">Total: $ ${price}</p>
    `;

    // Loading animation
    const spinner = document.querySelector('#loading img');
    spinner.style.display = "block";
    setTimeout(function(){
        spinner.style.display = "none";

        // Insert the result into html
        result.appendChild(div);
    },3000);

}