document.addEventListener("DOMContentLoaded", function () {

    let cart = [];

    const ORDER_URL =
        "https://script.google.com/macros/s/AKfycbxAWBZpg6a4AIUZNeGIuAG4EX4EPuRhocDjZZpr-cuJ5kzWXO5010jE1xHdOHyhcQj6OQ/exec";

    const cartIcon =
        document.querySelector("#cartIcon");

    const products =
        document.querySelectorAll(".product");


    // ===============================
    // PRODUCT ADD TO CART
    // ===============================

    products.forEach(function (product) {

        const name =
            product.querySelector(".product-info h3")
                .innerText
                .trim();

        const price =
            parseInt(
                product.querySelector(".product-info strong")
                    .innerText
                    .replace("৳", "")
                    .trim()
            );

        const button =
            product.querySelector(".add-cart-btn");


        if (!button) return;


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


            const oldText =
                button.innerText;

            button.innerText =
                "ADDED ✓";


            setTimeout(function () {

                button.innerText =
                    oldText;

            }, 900);

        });

    });


    // ===============================
    // CART COUNT
    // ===============================

    function updateCart() {

        let count = 0;

        cart.forEach(function (item) {
            count += item.quantity;
        });


        cartIcon.innerHTML =
            count > 0
                ? "🛒 " + count
                : "🛒";

    }


    // ===============================
    // CREATE CART MODAL
    // ===============================

    const cartModal =
        document.createElement("div");

    cartModal.id =
        "cartModal";


    cartModal.innerHTML = `

        <div class="cart-box">

            <button
                class="cart-close"
                type="button"
            >
                ×
            </button>

            <h2>Your Cart</h2>

            <div id="cartItems"></div>

            <div class="cart-total">

                <span>Total</span>

                <strong id="cartTotal">
                    ৳0
                </strong>

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
    // CART STYLE
    // ===============================

    const style =
        document.createElement("style");


    style.innerHTML = `

        #cartModal {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,.75);
            z-index: 99999;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        #cartModal.show {
            display: flex;
        }

        .cart-box {
            width: 100%;
            max-width: 500px;
            max-height: 85vh;
            overflow-y: auto;
            background: #111;
            color: white;
            border-radius: 12px;
            padding: 25px;
            position: relative;
        }

        .cart-close {
            position: absolute;
            top: 8px;
            right: 15px;
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
            gap: 12px;
            padding: 15px 0;
            border-bottom: 1px solid #333;
        }

        .cart-item-info {
            flex: 1;
        }

        .cart-item-name {
            font-weight: bold;
        }

        .cart-item-price {
            margin-top: 5px;
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
            background: #222;
            color: white;
            border: 1px solid #555;
            border-radius: 5px;
            cursor: pointer;
        }

        .quantity-number {
            min-width: 20px;
            text-align: center;
        }

        .remove-item {
            margin-top: 6px;
            background: none;
            border: none;
            color: #ff7777;
            cursor: pointer;
        }

        .cart-total {
            display: flex;
            justify-content: space-between;
            font-size: 20px;
            margin: 20px 0;
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


    document.head.appendChild(style);


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
                item.price *
                item.quantity;


            const div =
                document.createElement("div");


            div.className =
                "cart-item";


            div.innerHTML = `

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


            container.appendChild(div);

        });


        totalElement.innerText =
            "৳" + total.toLocaleString();


        // PLUS

        container
            .querySelectorAll(".plus-btn")
            .forEach(function (btn) {

                btn.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(btn.dataset.index);

                        cart[index].quantity++;

                        renderCart();
                        updateCart();

                    }
                );

            });


        // MINUS

        container
            .querySelectorAll(".minus-btn")
            .forEach(function (btn) {

                btn.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(btn.dataset.index);

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


        // REMOVE

        container
            .querySelectorAll(".remove-item")
            .forEach(function (btn) {

                btn.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(btn.dataset.index);

                        cart.splice(index, 1);

                        renderCart();
                        updateCart();

                    }
                );

            });

    }


    // ===============================
    // CLOSE CART
    // ===============================

    cartModal
        .querySelector(".cart-close")
        .addEventListener(
            "click",
            function () {

                cartModal.classList.remove(
                    "show"
                );

            }
        );


    cartModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === cartModal
            ) {

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
    // CHECKOUT
    // ===============================

    window.openCheckout =
        function () {

            const modal =
                document.getElementById(
                    "checkoutModal"
                );


            document
                .getElementById(
                    "checkoutForm"
                )
                .style.display =
                "block";


            document
                .getElementById(
                    "orderSuccess"
                )
                .style.display =
                "none";


            modal.classList.add("show");


            updateCheckoutTotal();

        };


    window.closeCheckout =
        function () {

            document
                .getElementById(
                    "checkoutModal"
                )
                .classList.remove(
                    "show"
                );

        };


    function updateCheckoutTotal() {

        let total = 0;


        cart.forEach(function (item) {

            total +=
                item.price *
                item.quantity;

        });


        document
            .getElementById(
                "checkoutTotal"
            )
            .innerText =
            "৳" + total.toLocaleString();

    }


    // ===============================
    // HEART
    // ===============================

    document
        .querySelectorAll(".heart")
        .forEach(function (heart) {

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


                let total = 0;


                cart.forEach(function (item) {

                    total +=
                        item.price *
                        item.quantity;

                });


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
                        "#checkoutForm .checkout-submit"
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

                }

                catch (error) {

                    console.error(error);

                    alert(
                        "Order could not be placed. Please try again."
                    );

                }


                submitButton.disabled =
                    false;

                submitButton.innerText =
                    "PLACE ORDER";

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


    updateCart();

});