var user_id = "{{ Auth::id() }}";
$(document).ready(function () {
    $('.addToCartBtn').click(function (e) {
        e.preventDefault();
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        var product_id = $(this).closest('.show').find('.prod_id').val();
        var product_qty = $(this).closest('.show').find('.qty_input').val();
        var attribute_v = $(this).closest('.show').find('.prod_v').val();
        if (attribute_v !== null) {
            var first_value = attribute_v.split(',')[0];
            var second_value = first_value.split('-')[1];
        }
        var price = $(this).closest('.show ').find('.price').val();
        $.ajax({
            method: "POST",
            url: "/add-to-cart",
            data: {
                'product_id': product_id,
                'product_qty': product_qty,
                'second_value': second_value,
                'price': price,
            },
            success: function (response) {
                if (response.success) {
                    setTimeout(function () {
                        location.reload();
                    }, 2000);
                    $('.cart-icon').removeClass('cart-icon');
                }
                else if (response.error) {
                    document.getElementById('nice').style.display = 'block';
                    setTimeout(function () {
                        document.getElementById('nice').style.opacity = '1';
                    }, 15);
                    document.getElementById('hideButton').addEventListener('click', function () {
                        document.getElementById('nice').style.display = 'none';
                        document.getElementById('nice').style.opacity = '0';
                    });
                } else if (response.Already) {
                    // swal(response.Already)
                    document.getElementById('ddd').style.fontSize = ('12px');
                    document.getElementById('ddd').innerHTML = response.Already;
                }
            },
        });
    });
    $('.increment-btn').click(function (e) {
        e.preventDefault();
        var inc_value = $(this).closest('.show').find('.qty_input').val();
        var stock_value = $(this).closest('.show').find('.stock_input:selected').attr('data-stock');
        var value = parseInt(inc_value, 10);
        value = isNaN(value) ? 0 : value;
        if (value < 10 && value <= stock_value - 1) {
            value++;
            $(this).closest('.show').find('.qty_input').val(value);
        }
    });
    $('.decrement-btn').click(function (e) {
        e.preventDefault();
        var dec_value = $(this).closest('.show').find('.qty_input').val();
        var stock_value = $(this).closest('.show').find('.stock_input:selected').attr('data-stock');
        var value = parseInt(dec_value, 10);
        value = isNaN(value) ? 0 : value;
        if (value > 1 && value <= stock_value) {
            value--;
            $(this).closest('.show').find('.qty_input').val(value);
        }
    });
});