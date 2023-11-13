window.onload = function () {
    document.getElementById('selsize').dispatchEvent(new Event('change'));
};
$(document).ready(function () {
    $("#selsize").change(function () {
        let idsize = $(this).val();
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        if (idsize == "") {
            return false;
        }
        $.ajax({
            type: 'get',
            url: '/get-product-price',
            data: {
                idsize: idsize
            },
            success: function (resp) {
                let arr = resp.split('#');
                $("#getPrice").html(arr[0] + ' ' + 'L.E');
                $("#ch").val(arr[0]);

                // alert(resp);
                // return false;
                if (arr[1] == 0) {
                    $("#cartbutton").hide();
                    $("#Availability").text('out of stock');
                    $(".outstock").addClass('out');
                } else {
                    $("#cartbutton").show();
                    $("#Availability").text('in stock');
                    $(".outstock").removeClass('out');
                }
            },
            error: function () {
                console.error('An error occurred while making the AJAX request');
            }
        });
    });
    const cartButtons = document.querySelectorAll('.cart-button');
    cartButtons.forEach(button => {
        button.addEventListener('click', cartClick);

    });
    function cartClick() {
        let button = this;
        button.classList.add('clicked');

    }
    function myFunction(e) {
        $('#myText').val(1);
    }
})
