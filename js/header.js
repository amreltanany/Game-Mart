$(document).ready(function () {
    var listVisible = false;
    $('#search').on('keyup', function () {
        var query = $(this).val();

        if (query.length > 0) {
            if (!listVisible) {
                $('#search_list').show();
                listVisible = true;
            }

            $.ajax({
                url: '/search?keyword=' + search,
                type: "GET",
                data: {
                    'search': query,
                    '_token': $('meta[name="csrf-token"]').attr('content')
                },
                success: function (data) {
                    $('#search_list').html(data);
                }
            });
        } else {
            $('#search_list').hide();
            listVisible = false;
        }
    });

    // hide search list on click away
    $(document).on('click', function (e) {
        if (!$(e.target).closest('#search').length) {
            $('#search_list').hide();
            listVisible = false;
        }
    });
});
