// Objects
// Everything related to the quotation and calculations is Insurance
class Insurance {
    constructor(make, year, level){
        this.make = make;
        this.year = year;
        this.level = level;
    }

    // Calculate the price for the current quotation
    calculateQuotation(insurance){
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
   getYearDifference(year){
        return new Date().getFullYear() - year;
    }

    // Calculate the price according to the level
   calculateLevel(price, level){
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
}



// Everything related to the html
class HTMLUI{
    // Displays the latest 20 years in select
   displayYears(){
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
    displayError(message){
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
    showResults(price, insurance){
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
}