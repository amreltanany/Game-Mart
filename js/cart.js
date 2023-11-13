var user_id = "{{ Auth::id() }}";
$(document).ready(function () {

    $('.increment-btn').click(function (e) {
        e.preventDefault();
        var inc_value = $(this).closest('.show').find('.qty_input').val();
        var value = parseInt(inc_value, 10);
        value = isNaN(value) ? 0 : value;
        if (value < 20) {
            value++;
            $(this).closest('.show').find('.qty_input').val(value);
        }
    });
    $('.decrement-btn').click(function (e) {
        e.preventDefault();
        var dec_value = $(this).closest('.show').find('.qty_input').val();
        var value = parseInt(dec_value, 10);
        value = isNaN(value) ? 0 : value;
        if (value > 1) {
            value--;
            $(this).closest('.show').find('.qty_input').val(value);
        }
    });
    $('.changeQuantity').click(function (e) {
        e.preventDefault();
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        var prod_id = $(this).closest('.show').find('.prod_id').val();
        var prod_qty = $(this).closest('.show').find('.qty_input').val();
        data = {
            'prod_id': prod_id,
            'prod_qty': prod_qty,
        }

        $.ajax({
            method: "POST",
            url: "update-cart",
            data: data,
            success: function (response) {
                window.location.reload();
            }
        });
    });
});