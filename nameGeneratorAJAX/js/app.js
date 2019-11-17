document.getElementById('generate-names').addEventListener('submit', generateName);

function generateName(){
    const country = document.getElementById('country').value;
    const genre =  document.getElementById('genre').value;
    const quantity = document.getElementById('quantity').value;

    let url = 'https://uinames.com/api/?';

    if(country !== ''){
        url += `region=${country}&`;
    }
    if(genre !== ''){
        url += `genre=${genre}&`;
    }
    if(country !== ''){
        url += `amount=${quantity}&`;
    }
    const xhr = new XMLHttpRequest();
    xhr.open('GET',url, true);

    xhr.onload = function(){
        if(this.status === 200){
            const result = JSON.parse(this.responseText);
            let output = '<h1>Generated Names</h1>';
            output+= '<ul class="list">';
            result.forEach(name => {
                output+=`<li>${name.name} ${name.surname}</li>`;
            });
            output += '</ul>';

            document.getElementById('result').innerHTML = output;
        }
    }
    xhr.send();

}