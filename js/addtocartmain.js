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
                    swal(response.success)
                    setTimeout(function () {
                        location.reload();
                    }, 1000);

                } else if (response.Already) {
                    swal(response.Already)

                }
            }
        });
    });
});
