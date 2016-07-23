// Handle cart backend.
$(document).ready(() => {
    if (typeof Storage !== null) {
        let total = 0;
        let cart = localStorage.getItem("shopping-cart");

        if (cart === null) return;

        $.each(JSON.parse(cart), (index, data) => {
            let html = `
                <tr>
                    <td>${data.name}</td>
                    <td>${data.price}</td>
                    <td>${data.amount}</td>
                    <td>${data.price * data.amount}</td>
                </tr>
            `;

            $("tbody").append(html);
            total += data.price * data.amount;
        });

        $("#total").html("PHP " + total);
    } else {
        Materialize.toast("Local storage not supported. Update ka na beh.", 4000);
    }

    $("#pay-btn").click(() => {
        if (typeof Storage !== null) {
            localStorage.removeItem("shopping-cart");
            $("tbody").html("");
            $("#total").html("PHP 0.00");
            Materialize.toast("Edi wow. Ikaw na bracket A beh.", 4000);
        } else {
            Materialize.toast("Local storage not supported. Update ka na beh.", 4000);
        }
    });

    $("#cancel-btn").click(() => {
        if (typeof Storage !== null) {
            localStorage.removeItem("shopping-cart");
            $("tbody").html("");
            $("#total").html("PHP 0.00");
            Materialize.toast("Edi wow beh.", 4000);
        } else {
            Materialize.toast("Local storage not supported. Update ka na beh.", 4000);
        }
    });
});
