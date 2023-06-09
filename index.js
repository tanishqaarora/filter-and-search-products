const productList = document.querySelector('.store-products');
const search = document.querySelector('.search-text');
search.addEventListener('keyup', getProducts);

// Firstly, fetch data from api endpoint
// Display filtered data based on search query
async function getProducts(e) {
    let fetchedData = await fetch('https://dummyjson.com/products ')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let products = data.products;

        // if search bar is empty
        if(search.value === '') {
            displayProduct(products);
        }
        // if search bar has value
        else {
            const searchInput = e.target.value.toLowerCase(); 
            const filteredProducts = products.filter((product) => {
                return(
                    product.title.toLowerCase().includes(searchInput)
                )
            })
            displayProduct(filteredProducts);
        }
    })
    .catch((err) => {
        console.log("Some error occur..", err);
    })
}

// Display products on the browser
const displayProduct = (products) => {
    productList.innerHTML = products.map((product) => {
        const image = product.images[0];
        const {title, rating, price } = product;
        return (
            `<div class='box'>
                <div class='img-box'>
                    <img class='images' src=${image}></img>
                </div>
                <div class='bottom'>
                    <h2>${title}</h2>
                    <p>Rating: ${rating}</p>
                    <h3>$ ${price}</h3>
                    <button>Add to cart</button>
                </div>
            </div>`
        )
    }).join('')
}

// invoke the function to get the products
getProducts();

