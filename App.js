let filteredProducts = [...products];

const productsContainer = document.querySelector('.products-container');

const displayProducts = () => {
  // if statement
  if (filteredProducts.length < 1) {
    productsContainer.innerHTML=`<h5>Sorry, No search match ypur criteria</h5>`
  }

  productsContainer.innerHTML = filteredProducts.map(({ id, company, image, price, title }) => {
    return `<article class="product" data-id="${id}">

        <img src="${image}" alt="${title}" class="product-img img">
        <footer>
          <h5 class="product-name">${title}</h5>
          <span class="product-price">$${price}</span>
        </footer>
      </article>`
  }).join('');
}

displayProducts();


const form = document.querySelector('.input-form');
const searchInput = document.querySelector('.search-input');

form.addEventListener('keyup', () => {
  const inputValue = searchInput.value;
  filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(inputValue);
  })
  displayProducts();
})

// buttons

const companiesDom = document.querySelector('.companies');

const displayButtons = () => {
  const buttons = ['all', ...new Set(products.map((product) => product.company))];
  console.log();
  companiesDom.innerHTML = buttons.map((company) => {
    return `<button class="company-btn" data-id="${company}">${company}</button>`
  }).join('');
}
displayButtons();

companiesDom.addEventListener('click', (e) => {
  let el = e.target;
  if (el.classList.contains('company-btn')) {
    if (el.dataset.id === 'all') {
      filteredProducts=[...products]
    } else {
      filteredProducts = products.filter((product) => {
        return product.company === el.dataset.id;
      });
    }
    searchInput.value = '';
    displayProducts();
  }
})
