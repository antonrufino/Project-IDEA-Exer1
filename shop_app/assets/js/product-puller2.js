$(document).ready(() => {
    $.ajax({
        url: "http://acssuplb.github.io/json/exer1_inventory.json",
        type: "GET",
        dataType: "json"
    })
        .done(json => {
            $.each(json, (index, data) => {
                let html = `
                    <div class="col s12 m6 l3">
                        <div class="card">
                            <div class="card-image">
                                <img class="responsive-img" src="${data.img_file}" />
                                <div class="card-title">
                                    ${data.name}<br />
                                    PHP ${data.price}
                                </div>
                            </div>
                            <div class="card-action">
                                In stock: ${data.quantity}
                                <form class="order-form">
                                    <div class="row">
                                        <div class="input-field col s12">
                                            <label for="${'key' + index}">Amount:</label>
                                            <input id="${'key' + index}" class="validate" type="number" name="amount" />
                                        </div>
                                        <button class="btn waves-effect waves-light amber darken-3 white-text" type="button" name="action" style="margin-left: 10.5px;"
                                            data-index="${index}" data-name="${data.name}" data-price="${data.price}" data-quantity="${data.quantity}">Add to
                                            <i class="material-icons right">shopping_cart</i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                `;

                $("#card-container > div.row").append(html);
            });

            $(".order-form button").click(e => {
                if (typeof Storage !== undefined) {
                    let cart;
                    let jsonCart = localStorage.getItem("shopping-cart");

                    if (jsonCart === null || jsonCart === "") cart = [];
                    else cart = JSON.parse(jsonCart);

                    let order = {
                        name: $(e.target).data("name"),
                        price: $(e.target).data("price"),
                        amount: $("#key" + $(e.target).data("index")).val()
                    };

                    if (order.amount > $(e.target).data("quantity")) {
                        Materialize.toast("Not enough in stock for order. #ArayBeh", 4000);
                        return;
                    } else if (order.amount <= 0) {
                        Materialize.toast("You ordered nothing. #SeryosoKaBaBeh", 4000);
                        return;
                    }

                    cart.push(order);
                    localStorage.setItem("shopping-cart", JSON.stringify(cart));

                    Materialize.toast("Order added to cart. #EdiWowBeh", 4000);
                    console.log(localStorage.getItem("shopping-cart"));
                } else {
                    Materialize.toast("Local storage not supported. Update ka na beh.", 4000);
                }
            });
            $(".order-form button").submit(false);
        })
        .fail(() => {
            Materialize.toast("A server error happened. #ArayKoBeh", 4000);
        });
});
