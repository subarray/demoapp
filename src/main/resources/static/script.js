$(function() {

    console.log('welcome');

    var check = {
      'name' : /^[a-z ]{2,30}$/,
        'color' : /^[a-z]{2,20}$/,
        'catdog' : /^(cat|dog)$/
    }

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

        if($('input.invalid').length > 0) {
            $('input.invalid').first().focus();
            return;
        }

        if($('input.empty').length > 0) {
            $('input.empty').first().focus();
            return;
        }

        $('.vcenter').addClass('submitting');
        setTimeout(function() {
            $('.vcenter').removeClass('submitting').addClass('submitted');
        }, 2000);
    });
});

