// variables
var sendBtn = document.getElementById('sendBtn');
var email = document.getElementById('email');
var subject = document.getElementById('subject');
var message = document.getElementById('message');
var emailForm = document.getElementById('email-form');

var spinner = document.getElementById('spinner');

// event liteners
eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', appInit);
    email.addEventListener('blur', validateField);
    subject.addEventListener('blur', validateField);
    message.addEventListener('blur', validateField);
    sendBtn.addEventListener('click', sendEmail);
}

// Functions
function appInit(){
    sendBtn.disabled = true;
}

function validateField(){
    validateLength(this);
    
    if(this.type === 'email'){
        validateEmail(this);
    }

    var error = document.querySelectorAll('.error');
    if(email.value !== '' && subject.value !== '' && message.value !== ''){
        if(error.length === 0){
            sendBtn.disabled = false;
        }
    }
    
}

function validateLength(field){
    if(field.value.length > 1){
        field.style.borderBottomColor = "green";
        field.classList.remove('error');
    }else{
        field.style.borderBottomColor = "red";
        field.classList.add('error');
    }

}

function validateEmail(field){
    if(field.value.indexOf('@') === -1 || field.value.indexOf('.') === -1){
        field.style.borderBottomColor = "red";
        field.classList.add('error');
    }else{
        field.style.borderBottomColor = "green";
        field.classList.remove('error');
    }
}

function sendEmail(e){
    e.preventDefault();
    spinner.style.display = 'block';
    setTimeout(function(){
        spinner.src = 'img/mail.gif';
        setTimeout(function(){
            spinner.style.display = 'none';
        },5000);
    },3000);
    
    emailForm.reset();
}