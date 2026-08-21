document.addEventListener("DOMContentLoaded", function () {

    // ===============================
    // CART
    // ===============================

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
    // CREATE CART MODAL
    // ===============================

    const cartModal = document.createElement("div");

    cartModal.id = "cartModal";

    cartModal.innerHTML = `
        <div class="cart-box">

            <button class="cart-close" type="button">
                ×
            </button>

            <h2>Your Cart</h2>

            <div id="cartItems"></div>

            <div class="cart-total">
                <span>Total</span>
                <strong id="cartTotal">৳0</strong>
            </div>

            <button
                id="proceedCheckout"
                class="checkout-submit"
                type="button"
            >
                PROCEED TO CHECKOUT
            </button>

        </div>
    `;

    document.body.appendChild(cartModal);


    // ===============================
    // CART CSS
    // ===============================

    const cartStyle = document.createElement("style");

    cartStyle.innerHTML = `

        #cartModal {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.75);
            z-index: 9999;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        #cartModal.show {
            display: flex;
        }

        .cart-box {
            background: #111;
            color: white;
            width: 100%;
            max-width: 500px;
            max-height: 85vh;
            overflow-y: auto;
            padding: 25px;
            border-radius: 12px;
            position: relative;
            box-sizing: border-box;
        }

        .cart-box h2 {
            margin-top: 0;
            margin-bottom: 20px;
        }

        .cart-close {
            position: absolute;
            right: 15px;
            top: 10px;
            background: none;
            border: none;
            color: white;
            font-size: 30px;
            cursor: pointer;
        }

        .cart-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 15px;
            padding: 15px 0;
            border-bottom: 1px solid #333;
        }

        .cart-item-info {
            flex: 1;
        }

        .cart-item-name {
            font-weight: bold;
            margin-bottom: 5px;
        }

        .cart-item-price {
            color: #d4ad63;
        }

        .quantity-controls {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .quantity-controls button {
            width: 30px;
            height: 30px;
            border: 1px solid #555;
            background: #222;
            color: white;
            border-radius: 5px;
            cursor: pointer;
        }

        .quantity-number {
            min-width: 20px;
            text-align: center;
        }

        .remove-item {
            background: none;
            border: none;
            color: #ff7777;
            cursor: pointer;
            font-size: 13px;
        }

        .cart-total {
            display: flex;
            justify-content: space-between;
            margin: 20px 0;
            font-size: 20px;
        }

        .cart-total strong {
            color: #d4ad63;
        }

        .empty-cart {
            text-align: center;
            padding: 30px 0;
            color: #aaa;
        }

    `;

    document.head.appendChild(cartStyle);


    // ===============================
    // PRODUCT BUTTONS
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


        let button =
            product.querySelector(".add-cart-btn");


        // If button does not exist,
        // create one automatically.

        if (!button) {

            button =
                document.createElement("button");

            button.className =
                "add-cart-btn";

            button.type = "button";

            button.innerText =
                "ADD TO CART 🛒";


            product
                .querySelector(".product-info")
                .appendChild(button);

        }


        // ===============================
        // ADD PRODUCT
        // ===============================

        button.addEventListener("click", function (event) {

            event.preventDefault();

            event.stopPropagation();


            const existing =
                cart.find(function (item) {

                    return item.name === name;

                });


            if (existing) {

                existing.quantity++;

            } else {

                cart.push({

                    name: name,

                    price: price,

                    quantity: 1

                });

            }


            updateCart();


            button.innerText =
                "ADDED ✓";


            setTimeout(function () {

                button.innerText =
                    "ADD TO CART 🛒";

            }, 900);

        });

    });


    // ===============================
    // UPDATE CART ICON
    // ===============================

    function updateCart() {

        let count = 0;


        cart.forEach(function (item) {

            count += item.quantity;

        });


        if (count === 0) {

            cartIcon.innerHTML = "🛒";

        } else {

            cartIcon.innerHTML =
                "🛒 " + count;

        }

    }


    // ===============================
    // RENDER CART
    // ===============================

    function renderCart() {

        const container =
            document.getElementById("cartItems");


        const totalElement =
            document.getElementById("cartTotal");


        if (cart.length === 0) {

            container.innerHTML = `
                <div class="empty-cart">
                    Your cart is empty 🛒
                </div>
            `;

            totalElement.innerText =
                "৳0";

            return;

        }


        container.innerHTML = "";


        let total = 0;


        cart.forEach(function (item, index) {

            total +=
                item.price * item.quantity;


            const itemElement =
                document.createElement("div");


            itemElement.className =
                "cart-item";


            itemElement.innerHTML = `

                <div class="cart-item-info">

                    <div class="cart-item-name">
                        ${item.name}
                    </div>

                    <div class="cart-item-price">
                        ৳${item.price.toLocaleString()}
                    </div>

                    <button
                        class="remove-item"
                        data-index="${index}"
                        type="button"
                    >
                        Remove
                    </button>

                </div>


                <div class="quantity-controls">

                    <button
                        class="minus-btn"
                        data-index="${index}"
                        type="button"
                    >
                        −
                    </button>

                    <span class="quantity-number">
                        ${item.quantity}
                    </span>

                    <button
                        class="plus-btn"
                        data-index="${index}"
                        type="button"
                    >
                        +
                    </button>

                </div>

            `;


            container.appendChild(itemElement);

        });


        totalElement.innerText =
            "৳" + total.toLocaleString();


        // ===============================
        // PLUS
        // ===============================

        document
            .querySelectorAll(".plus-btn")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            parseInt(
                                button.dataset.index
                            );


                        cart[index].quantity++;


                        renderCart();

                        updateCart();

                    }
                );

            });


        // ===============================
        // MINUS
        // ===============================

        document
            .querySelectorAll(".minus-btn")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            parseInt(
                                button.dataset.index
                            );


                        cart[index].quantity--;


                        if (
                            cart[index].quantity <= 0
                        ) {

                            cart.splice(index, 1);

                        }


                        renderCart();

                        updateCart();

                    }
                );

            });


        // ===============================
        // REMOVE
        // ===============================

        document
            .querySelectorAll(".remove-item")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            parseInt(
                                button.dataset.index
                            );


                        cart.splice(index, 1);


                        renderCart();

                        updateCart();

                    }
                );

            });

    }


    // ===============================
    // OPEN CART
    // ===============================

    cartIcon.addEventListener(
        "click",
        function () {

            renderCart();

            cartModal.classList.add("show");

        }
    );


    // ===============================
    // CLOSE CART
    // ===============================

    cartModal
        .querySelector(".cart-close")
        .addEventListener(
            "click",
            function () {

                cartModal.classList.remove("show");

            }
        );


    // ===============================
    // CLICK OUTSIDE CART
    // ===============================

    cartModal.addEventListener(
        "click",
        function (event) {

            if (event.target === cartModal) {

                cartModal.classList.remove(
                    "show"
                );

            }

        }
    );


    // ===============================
    // PROCEED TO CHECKOUT
    // ===============================

    document
        .getElementById("proceedCheckout")
        .addEventListener(
            "click",
            function () {

                if (cart.length === 0) {

                    alert(
                        "Your cart is empty!"
                    );

                    return;

                }


                cartModal.classList.remove(
                    "show"
                );


                openCheckout();

            }
        );


    // ===============================
    // OPEN CHECKOUT
    // ===============================

    window.openCheckout = function () {

        const modal =
            document.getElementById(
                "checkoutModal"
            );


        document
            .getElementById("checkoutForm")
            .style.display = "block";


        document
            .getElementById("orderSuccess")
            .style.display = "none";


        modal.classList.add("show");


        updateCheckoutTotal();

    };


    // ===============================
    // CLOSE CHECKOUT
    // ===============================

    window.closeCheckout = function () {

        document
            .getElementById("checkoutModal")
            .classList.remove(
                "show"
            );

    };


    // ===============================
    // CHECKOUT TOTAL
    // ===============================

    function updateCheckoutTotal() {

        let total = 0;


        cart.forEach(function (item) {

            total +=
                item.price *
                item.quantity;

        });


        document
            .getElementById("checkoutTotal")
            .innerText =
            "৳" + total.toLocaleString();

    }


    // ===============================
    // HEART BUTTON
    // ===============================

    const hearts =
        document.querySelectorAll(".heart");


    hearts.forEach(function (heart) {

        heart.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                if (
                    heart.innerHTML.trim()
                    === "♡"
                ) {

                    heart.innerHTML = "♥";

                    heart.style.color =
                        "#d4ad63";

                } else {

                    heart.innerHTML = "♡";

                    heart.style.color =
                        "white";

                }

            }
        );

    });


    // ===============================
    // PLACE ORDER
    // ===============================

    document
        .getElementById("checkoutForm")
        .addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const name =
                    document
                        .getElementById(
                            "customerName"
                        )
                        .value
                        .trim();


                const phone =
                    document
                        .getElementById(
                            "customerPhone"
                        )
                        .value
                        .trim();


                const address =
                    document
                        .getElementById(
                            "customerAddress"
                        )
                        .value
                        .trim();


                const payment =
                    document
                        .getElementById(
                            "paymentMethod"
                        )
                        .value;


                if (
                    !name ||
                    !phone ||
                    !address ||
                    !payment
                ) {

                    alert(
                        "Please fill all information."
                    );

                    return;

                }


                // ===============================
                // TOTAL
                // ===============================

                let total = 0;


                cart.forEach(function (item) {

                    total +=
                        item.price *
                        item.quantity;

                });


                // ===============================
                // PRODUCT LIST
                // ===============================

                const productList =
                    cart
                        .map(function (item) {

                            return (
                                item.name +
                                " x" +
                                item.quantity +
                                " - ৳" +
                                (
                                    item.price *
                                    item.quantity
                                )
                            );

                        })
                        .join(", ");


                // ===============================
                // ORDER DATA
                // ===============================

                const orderData = {

                    name: name,

                    phone: phone,

                    address: address,

                    product: productList,

                    price: total,

                    payment: payment

                };


                const submitButton =
                    document.querySelector(
                        ".checkout-submit"
                    );


                submitButton.disabled = true;

                submitButton.innerText =
                    "PLACING ORDER...";


                try {

                    await fetch(
                        ORDER_URL,
                        {

                            method: "POST",

                            mode: "no-cors",

                            headers: {

                                "Content-Type":
                                    "text/plain"

                            },

                            body:
                                JSON.stringify(
                                    orderData
                                )

                        }
                    );


                    document
                        .getElementById(
                            "checkoutForm"
                        )
                        .style.display =
                        "none";


                    document
                        .getElementById(
                            "orderSuccess"
                        )
                        .style.display =
                        "block";


                    cart = [];


                    updateCart();


                    submitButton.disabled =
                        false;


                    submitButton.innerText =
                        "PLACE ORDER";

                }

                catch (error) {

                    console.error(error);


                    alert(
                        "Order could not be placed. Please try again."
                    );


                    submitButton.disabled =
                        false;


                    submitButton.innerText =
                        "PLACE ORDER";

                }

            }
        );


    // ===============================
    // CLOSE CHECKOUT OUTSIDE
    // ===============================

    document
        .getElementById("checkoutModal")
        .addEventListener(
            "click",
            function (event) {

                if (
                    event.target === this
                ) {

                    closeCheckout();

                }

            }
        );


    // ===============================
    // INITIAL
    // ===============================

    updateCart();

});