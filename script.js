// ===============================
// ZAVERON SHOPPING CART
// ===============================

let cart = [];


// ===============================
// GOOGLE SHEETS ORDER URL
// ===============================

const ORDER_URL =
    "https://script.google.com/macros/s/AKfycbwr479iPew3XYs5c8OBNfxKUj8ldpIwQ2sBXmY-Ewgvsru8Gm-i1PJd4hQUcmgqu1LD/exec";


// ===============================
// ADD TO CART
// ===============================

const products = document.querySelectorAll(".product");

products.forEach(function(product) {

    const priceText = product
        .querySelector(".product-info strong")
        .innerText
        .replace("৳", "")
        .trim();

    const price = parseInt(priceText);

    const name = product
        .querySelector(".product-info h3")
        .innerText
        .trim();

    product.addEventListener("click", function(event) {

        if (event.target.classList.contains("heart")) {
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


// ===============================
// UPDATE CART
// ===============================

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
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const name =
            document.getElementById("customerName").value.trim();

        const phone =
            document.getElementById("customerPhone").value.trim();

        const address =
            document.getElementById("customerAddress").value.trim();

        const payment =
            document.getElementById("paymentMethod").value;


        if (!name || !phone || !address || !payment) {

            alert("Please fill all information.");

            return;

        }


        // Calculate total

        let total = 0;

        cart.forEach(function(item) {
            total += item.price;
        });


        // Product list

        const productList = cart
            .map(function(item) {
                return item.name + " - ৳" + item.price;
            })
            .join(", ");


        // Order data

        const orderData = {

            name: name,

            phone: phone,

            address: address,

            product: productList,

            price: total,

            payment: payment

        };


        // Disable button

        const submitButton =
            document.querySelector(".checkout-submit");

        submitButton.disabled = true;

        submitButton.innerText = "PLACING ORDER...";


        try {

            await fetch(ORDER_URL, {

                method: "POST",

                mode: "no-cors",

                headers: {
                    "Content-Type": "text/plain"
                },

                body: JSON.stringify(orderData)

            });


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


        } catch (error) {

            console.error(error);

            alert(
                "Order could not be placed. Please try again."
            );

            submitButton.disabled = false;

            submitButton.innerText = "PLACE ORDER";

        }

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