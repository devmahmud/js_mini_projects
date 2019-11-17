// Classes
class Budget{
    constructor(budget){
        this.budget = Number(budget);
        this.budgetLeft = this.budget;
    }
    substractFromBudget(amount){
        return this.budgetLeft -= amount;
    }
}

class HTML{
    insertBudget(amount){
        budgetTotal.innerHTML = `${amount}`;
        budgetLeft.innerHTML = `${amount}`;
    }

    printMessage(msg, alertClass){
        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('text-center', 'alert', alertClass);
        messageWrapper.appendChild(document.createTextNode(msg));

        document.querySelector('.primary').insertBefore(messageWrapper, addExpenseForm);

        setTimeout(function(){
            document.querySelector('.primary .alert').remove();
        },3000);
    }

    addExpense(name, amount){
        const expensesList = document.querySelector('#expenses ul');

        const li = document.createElement('li');
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        li.innerHTML = `${name}
            <span class="badge badge-primary badge-pill">${amount}</span>
        `;

        expensesList.appendChild(li);

    }
    trackBudget(amount){
        const budgetLeftDollar = budget.substractFromBudget(amount);
        budgetLeft.innerHTML = `${budgetLeftDollar}`;
        addExpenseForm.reset();

        // Check when 25% is left
        if(budgetLeftDollar < (budget.budget/4) ){
            budgetLeft.parentElement.parentElement.classList.remove('alert-success', 'alert-warning');
            budgetLeft.parentElement.parentElement.classList.add('alert-danger');

        }else if(budgetLeftDollar < (budget.budget/2)){
            budgetLeft.parentElement.parentElement.classList.remove('alert-success');
            budgetLeft.parentElement.parentElement.classList.add('alert-warning');
        }

    }

}


// Variables
const html = new HTML(),
    addExpenseForm = document.querySelector('#add-expense'),
    budgetTotal = document.querySelector('span#total'),
    budgetLeft = document.querySelector('span#left');

let budget,userBudget; 


// Event listeners
eventListeners();

function eventListeners(){
    // App init
    document.addEventListener('DOMContentLoaded',function(){
        // Ask the visitor the weekly budget
        userBudget = window.prompt('What\'s your budget for this week?');
        if(userBudget === null || userBudget === '' || userBudget <=0){
            window.location.reload();
        }else{
            // Budget is valid then instantiate the budget class
            budget = new Budget(userBudget);
            
            // Instantiate html class
            html.insertBudget(budget.budget);
        }
    });


    addExpenseForm.addEventListener('submit', function(e){
        e.preventDefault();

        // Read the form values
        const expName = document.getElementById('expense').value;
        const amount = document.getElementById('amount').value;

        if(expName === '' || amount === ''){
            html.printMessage('There was error! All the fields are mandatory', 'alert-danger');
        }else{
            html.addExpense(expName, amount);
            html.trackBudget(amount);
            html.printMessage('Added...', 'alert-success');
        }

    });
}