// ===============================
// ZAVERON SHOPPING CART
// ===============================

let cart = [];


// ADD TO CART

const products = document.querySelectorAll(".product");

products.forEach(function(product) {

    const priceText = product
        .querySelector(".product-info strong")
        .innerText
        .replace("৳", "");

    const price = parseInt(priceText);

    const name = product
        .querySelector(".product-info h3")
        .innerText;

    product.addEventListener("click", function(event) {

        if (
            event.target.classList.contains("heart")
        ) {
            return;
        }

        cart.push({
            name: name,
            price: price
        });

        alert(name + " added to cart!");

        updateCart();

    });

});


// UPDATE CART

function updateCart() {

    const cartIcon =
        document.querySelector(".icons span:last-child");

    cartIcon.innerHTML = "🛒 " + cart.length;

}


// ===============================
// HEART BUTTON
// ===============================

const hearts =
    document.querySelectorAll(".heart");

hearts.forEach(function(heart) {

    heart.addEventListener("click", function(event) {

        event.stopPropagation();

        if (heart.innerHTML === "♡") {

            heart.innerHTML = "♥";

            heart.style.color = "#d4ad63";

        } else {

            heart.innerHTML = "♡";

            heart.style.color = "white";

        }

    });

});


// ===============================
// CART CLICK
// ===============================

document
.querySelector(".icons span:last-child")
.addEventListener("click", function() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }

    openCheckout();

});


// ===============================
// OPEN CHECKOUT
// ===============================

function openCheckout() {

    const modal =
        document.getElementById("checkoutModal");

    modal.classList.add("show");

    updateCheckoutTotal();

}


// ===============================
// CLOSE CHECKOUT
// ===============================

function closeCheckout() {

    document
        .getElementById("checkoutModal")
        .classList.remove("show");

}


// ===============================
// TOTAL
// ===============================

function updateCheckoutTotal() {

    let total = 0;

    cart.forEach(function(item) {

        total += item.price;

    });

    document
        .getElementById("checkoutTotal")
        .innerText =
        "৳" + total.toLocaleString();

}


// ===============================
// PLACE ORDER
// ===============================

document
.getElementById("checkoutForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("customerName").value;

    const phone =
        document.getElementById("customerPhone").value;

    const address =
        document.getElementById("customerAddress").value;

    const payment =
        document.getElementById("paymentMethod").value;


    if (!name || !phone || !address || !payment) {

        alert("Please fill all information.");

        return;

    }


    // Order information

    console.log("NEW ZAVERON ORDER");

    console.log("Customer:", name);

    console.log("Phone:", phone);

    console.log("Address:", address);

    console.log("Payment:", payment);

    console.log("Products:", cart);


    // Hide form

    document
        .getElementById("checkoutForm")
        .style.display = "none";


    // Show success

    document
        .getElementById("orderSuccess")
        .style.display = "block";


    // Clear cart

    cart = [];

    updateCart();

});


// ===============================
// CLOSE MODAL WHEN CLICK OUTSIDE
// ===============================

document
.getElementById("checkoutModal")
.addEventListener("click", function(event) {

    if (event.target === this) {

        closeCheckout();

    }

});