// variables
var courses = document.getElementById('courses-list');
var cart = document.querySelector('#cart-content tbody');

// Event Listeners
eventListeners();

function eventListeners(){
    courses.addEventListener('click',buyCourse);
    cart.addEventListener('click',removeProduct);
    document.getElementById('clear-cart').addEventListener('click',clearCart);
    document.addEventListener('DOMContentLoaded', displayCartProduct);
}


// Functions
function buyCourse(e){
    
    if(e.target.classList.contains('add-to-cart')){
        e.preventDefault();
        var product = getProduct(e.target.parentElement.parentElement);

        addToCart(product);
        
        addToStorage(product);
    }
    
}

function getProduct(product){
    var productInfo = {
        'id': product.querySelector('.add-to-cart').getAttribute('data-id'),
        'image': product.querySelector('img').src,
        'name': product.querySelector('h4').textContent,
        'price': product.querySelector('.price span').textContent
    }
    return productInfo;
}

function addToCart(product){
    var tr = document.createElement('tr');
    var item = `<td><img src="${product.image}" width="100px"></img></td>
    <td>${product.name}</td>
    <td>${product.price}</td>
    <td><a href="#" class="remove" data-id=${product.id}>X</a></td>
    `;
    tr.innerHTML = item;
    cart.appendChild(tr);
}

function removeProduct(e){
    e.preventDefault();

    removeFromStorage(e.target.getAttribute('data-id'));

    if(e.target.classList.contains('remove')){
        e.target.parentElement.parentElement.remove();
    }
}

function clearCart(e){
    while(cart.firstChild){
        cart.removeChild(cart.firstChild);
    }
    localStorage.clear();
    e.preventDefault();
}

function addToStorage(product){
    var productList = getFromStorage();
    
    productList.push(product);

    localStorage.setItem('products', JSON.stringify(productList));
}

function getFromStorage(){
    var products;
    if(localStorage.getItem('products') === null){
        products = [];
    }else{
        products = JSON.parse(localStorage.getItem('products'));
    }
    return products;
}

function removeFromStorage(pid){
    var products = getFromStorage();
    products.forEach(function(item, id){
        if(item.id === pid){
            products.splice(id,1);
        }
    });
    localStorage.setItem('products',JSON.stringify(products));
}

function displayCartProduct(){
    var products = getFromStorage();
    products.forEach(function(item){
        addToCart(item);
    });

}