import { menu } from './data.js'

const itemFeed = document.getElementById('item-feed')
const modal = document.querySelector('.modal')
let total = 0
//console.log(menu)

function getItems() {
    // const totalIngredients = menu.ingredients.map((veggies) => veggies)
    const render = menu.map((item) => {
        const totalIngredients = item.ingredients.map((veggies) => veggies).join(', ')
        return `            
            <div class="food-item">
                <div class="left">
                    <div class="image">
                        <h1>${item.emoji}</h1>
                    </div>
                    <div class="text">
                        <h2 id ="${item.id}">${item.name}</h2>
                        <p>${totalIngredients}</p>
                        <h3>$${item.price}</h3>
                    </div>
                    
            
                </div>
                <div class="right">
                    <img class="add-btn" data-add-icon ="${item.id}" src="Images/icons8-black.png" alt="addOrder">
                </div>
            </div>`
    })
    
    return render
}
itemFeed.innerHTML += getItems()


// const addBtn = document.querySelector('.add-btn')
// addBtn.addEventListener('mouseleave', () => {
//     console.log('Hovered!!')
// })

document.addEventListener('click',(e) => {
    if(e.target.dataset.addIcon){
        handleClick(e.target.dataset.addIcon)
    }
    
})

function handleClick(itemId) {
    const targetFoodItem = menu.filter((item) => {
        return item.id == itemId
        
    })[0]
    // const targetFoodItem = menu.map((item) => {
    //     if(item.id == itemId){
    //         return item
    //     }
    renderSummary(targetFoodItem)
    // })
    //console.log(targetFoodItem)
}


function renderSummary(item) {
    
    document.querySelector('.summary-feed').innerHTML += `
    <div class="summary-feed-item">
        <div class="left-col">
            <h2>${item.name}</h2>
            <p>remove</p>
        </div>
        <div class="right-col">
            <p>$${item.price}</p>
        </div>
    </div>
    `
    total+= item.price

    document.querySelector('.total').innerHTML = `
    <div class="last-col">
        <h2>Total price:</h2>
        <p>$${total}</p>
    </div>
    <div class="order-btn">
        <a id="complete-btn" href="#">Complete order</a>
    </div>
    `
    completePayment()
    return total
}


function completePayment(){
    const completeBtn = document.getElementById('complete-btn')
    const paymentBtn = document.getElementById('payment-btn')
    const closeBtn = document.querySelector('.modal-close-btn')

    completeBtn.addEventListener('click',()=> modal.style.display = "block")
    closeBtn.addEventListener('click',()=>modal.style.display = "none")
    paymentBtn.addEventListener('click',(e)=> {
        e.preventDefault()
        document.querySelector('.modal-inner').innerHTML = `
        <p id="upload-text">Placing your Order...</p>
        <div clas="modal-inner-loading">
            <img src="Images/loading.svg" class="loading"
        </div>
        
        `
        quitTimer()
        console.log('paid!!')
    })
}

function quitTimer(){
    setTimeout(function(){
        modal.style.display = "none"
        document.querySelector('.checkout-area').innerHTML = `
        <p class="thank-you-msg">Thanks! Your order is on its way!</p>
        `
    },4000)
}
//console.log(getItems())
