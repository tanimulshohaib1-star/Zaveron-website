// ===============================
// ZAVERON SHOPPING CART
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    let cart = [];

    // ===============================
    // GOOGLE SHEETS ORDER URL
    // ===============================

    const ORDER_URL =
        "https://script.google.com/macros/s/AKfycbxAWBZpg6a4AIUZNeGIuAG4EX4EPuRhocDjZZpr-cuJ5kzWXO5010jE1xHdOHyhcQj6OQ/exec";


    // ===============================
    // CART ICON
    // ===============================

    const cartIcon =
        document.querySelector(".icons span:last-child");


    // ===============================
    // PRODUCTS
    // ===============================

    const products =
        document.querySelectorAll(".product");


    products.forEach(function (product) {

        const name =
            product.querySelector(".product-info h3")
                .innerText
                .trim();

        const priceText =
            product.querySelector(".product-info strong")
                .innerText
                .replace("৳", "")
                .trim();

        const price =
            parseInt(priceText);


        // Create Add To Cart Button

        const button =
            document.createElement("button");

        button.className = "add-cart-btn";

        button.innerText =
            "ADD TO CART 🛒";


        // Put button inside product info

        product
            .querySelector(".product-info")
            .appendChild(button);


        // ===============================
        // ADD TO CART
        // ===============================

        button.addEventListener("click", function (event) {

            event.stopPropagation();

            cart.push({
                name: name,
                price: price
            });

            updateCart();

            button.innerText = "ADDED ✓";

            setTimeout(function () {
                button.innerText = "ADD TO CART 🛒";
            }, 1000);

        });


        // Prevent whole product click

        product.addEventListener("click", function (event) {

            if (
                event.target.classList.contains("heart") ||
                event.target.classList.contains("add-cart-btn")
            ) {
                return;
            }

        });

    });


    // ===============================
    // UPDATE CART
    // ===============================

    function updateCart() {

        if (cart.length === 0) {

            cartIcon.innerHTML = "🛒";

        } else {

            cartIcon.innerHTML =
                "🛒 " + cart.length;

        }

    }


    // ===============================
    // HEART BUTTON
    // ===============================

    const hearts =
        document.querySelectorAll(".heart");


    hearts.forEach(function (heart) {

        heart.addEventListener("click", function (event) {

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

    cartIcon.addEventListener("click", function () {

        if (cart.length === 0) {

            alert("Your cart is empty!");

            return;

        }

        openCheckout();

    });


    // ===============================
    // OPEN CHECKOUT
    // ===============================

    window.openCheckout = function () {

        const modal =
            document.getElementById("checkoutModal");

        const form =
            document.getElementById("checkoutForm");

        const success =
            document.getElementById("orderSuccess");


        form.style.display = "block";

        success.style.display = "none";

        modal.classList.add("show");

        updateCheckoutTotal();

    };


    // ===============================
    // CLOSE CHECKOUT
    // ===============================

    window.closeCheckout = function () {

        document
            .getElementById("checkoutModal")
            .classList.remove("show");

    };


    // ===============================
    // TOTAL
    // ===============================

    function updateCheckoutTotal() {

        let total = 0;

        cart.forEach(function (item) {

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
        .addEventListener("submit", async function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("customerName")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("customerPhone")
                    .value
                    .trim();


            const address =
                document
                    .getElementById("customerAddress")
                    .value
                    .trim();


            const payment =
                document
                    .getElementById("paymentMethod")
                    .value;


            if (!name || !phone || !address || !payment) {

                alert("Please fill all information.");

                return;

            }


            // Calculate total

            let total = 0;

            cart.forEach(function (item) {

                total += item.price;

            });


            // Product list

            const productList =
                cart
                    .map(function (item) {

                        return (
                            item.name +
                            " - ৳" +
                            item.price
                        );

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


            // Submit button

            const submitButton =
                document.querySelector(
                    ".checkout-submit"
                );


            submitButton.disabled = true;

            submitButton.innerText =
                "PLACING ORDER...";


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


                submitButton.disabled = false;

                submitButton.innerText =
                    "PLACE ORDER";


            } catch (error) {

                console.error(error);

                alert(
                    "Order could not be placed. Please try again."
                );


                submitButton.disabled = false;

                submitButton.innerText =
                    "PLACE ORDER";

            }

        });


    // ===============================
    // CLOSE MODAL OUTSIDE
    // ===============================

    document
        .getElementById("checkoutModal")
        .addEventListener("click", function (event) {

            if (event.target === this) {

                closeCheckout();

            }

        });


    // Initial cart

    updateCart();

});