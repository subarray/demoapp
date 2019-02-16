$(function() {

    console.log('welcome');

    var check = {
      'name' : /^[a-z ]{2,30}$/,
        'color' : /^[a-z]{2,20}$/,
        'catdog' : /^(cat|dog)$/
    }

    $('input').each(function(){
       if ($(this).val().length === 0)
          $(this).addClass('empty');
       else
          $(this).removeClass('empty');
    });

    $('input').on('focus', function() {
        $(this).addClass('focused');
    });

    $('input').on('blur', function() {
        $(this).removeClass('focused');
    });

    $('input').on('keyup', function() {
        if ($(this).val().length === 0) {
            $(this).addClass('empty').removeClass('invalid');
        } else {
            $(this).removeClass('empty');
            const id = $(this).attr('id');
            if (check[id].test($(this).val().toLowerCase()))
                $(this).removeClass('invalid');
            else
                $(this).addClass('invalid');
        }
    });

    $('a.reset').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $('form').trigger('reset');
        $('input').addClass('empty');
        $('.vcenter').removeClass('submitted');
    })

    $('form').on('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();

        if($('input.invalid').length > 0) {
            $('input.invalid').first().focus();
            return;
        }

        if($('input.empty').length > 0) {
            $('input.empty').first().focus();
            return;
        }

        $('.vcenter').addClass('submitting');
        $('#error').removeClass('show');
        const name = $('#name').val();
        $.ajax({
            type: 'POST',
            url: '/create',
            contentType: 'application/json',
            data: JSON.stringify({name: name, color:$('#color').val(),catdog:$('#catdog').val()}),
            success: function (res) {
                console.log('ok', res);
                $('.vcenter').removeClass('submitting').addClass('submitted');
            },
            error: function (err) {
                $('#error .message').text(err.responseJSON.message);
                $('#name').focus();
                $('#error').addClass('show');
                $('.vcenter').removeClass('submitting');
                console.log('error', err);
            }
        });
    });
});

