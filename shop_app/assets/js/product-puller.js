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
                                <img class="responsive-img" src="${data.img_file2}" />
                                <div class="card-title">
                                    ${data.name}<br />
                                    PHP ${data.price}
                                </div>
                            </div>
                            <div class="card-action">
                                In stock: ${data.quantity}
                                <form>
                                    <div class="row">
                                        <div class="input-field col s12">
                                            <label for="${data.name + '-key'}">Amount:</label>
                                            <input id="${data.name + '-key'}" class="validate" type="number" name="amount" />
                                        </div>
                                    </div>
                                </form>
                                <a href="#">Buy</a>
                            </div>
                        </div>
                    </div>
                `;

                $("#card-container > div.row").append(html);
            });
        })
        .fail(() => {
            Materialize.toast("A server error happened. #ArayKoBeh", 4000);
        });
});
