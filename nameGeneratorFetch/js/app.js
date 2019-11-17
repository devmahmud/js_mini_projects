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

    // Fetch api
    fetch(url)
        .then(response => response.json()
        ).then(names => {
            let html = "<h2>Generated Names</h2>";
            html += "<ul class='list'>";
            names.forEach(function(name){
                html += `<li>${name.name} ${name.surname}</li>`;
            });
            html += "</ul>";

            document.getElementById('result').innerHTML = html;
        }).catch(error => console.log(error));
    
}