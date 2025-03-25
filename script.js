const select = document.getElementById('select')
const input = document.getElementById('input')
const container = document.getElementById('cards')
const box = document.getElementById('box') 
const select2 = document.getElementById('select2')
let products = [] 
const api = `https://fakestoreapi.com/products`

async function fetchApi() {
    try {
        box.style.display = 'block'; 
        const response = await fetch(api)
        const data = await response.json()
        products = data 
        display() 
    } catch (error) {
        console.log(`Error:`, error)
    } finally {
        box.style.display = "none"; 
    }
}

function display(productsToDisplay) {
    container.innerHTML = ``;
    (productsToDisplay || products).forEach(prod => { 
        const card = document.createElement('div')
        card.classList.add('card')
        card.innerHTML = `
            <img src="${prod.image}" alt="">
            <h1>${prod.title}</h1>
            <h3>category: ${prod.category}</h3>
            <h3>id: ${prod.id}</h3>
            <h2>price: ${prod.price}</h2>
        `
        container.appendChild(card)
    })
}

function search() {
    const searchValue = input.value.toLowerCase().trim();
    const filtered = products.filter(element => {
        const title = element.title.trim().toLowerCase(); 
        return title.includes(searchValue);
    });
  
    if (filtered.length > 0) {
        display(filtered);
    } else {
        container.innerHTML = `<p>НЕ НАЙДЕНО</p>`;
    }
}


function filterByCategory(){
    const selectValue= select.value.toLowerCase();
    let filtered;
    if(selectValue === "все категории"){
    filtered=products;
    }else{
        filtered = products.filter(prod => prod.category.toLowerCase()===selectValue)
    }
    display(filtered)
}

function sortPrice(){
    const pro = products
  if(select2.value==='по возрастанию'){
    pro.sort((a,b) => parseFloat(a.price) -parseFloat(b.price))
  }else if(select2.value=== 'по убыванию'){
    pro.sort((a,b) => parseFloat(b.price) -parseFloat(a.price))
  }
  display(pro)
}

select2.addEventListener('change', sortPrice)
select.addEventListener('change', filterByCategory)
input.addEventListener('input', search);
fetchApi();
