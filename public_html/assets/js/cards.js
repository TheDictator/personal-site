$(function() {
    $('.material-card > .mc-btn-action').click(function () {
        var card = $(this).parent('.material-card');
        var icon = $(this).children('i');
        icon.addClass('fa-spin-fast');

        if (card.hasClass('mc-active')) {
            card.removeClass('mc-active');

            window.setTimeout(function() {
                icon
                    .removeClass('fa-minus')
                    .removeClass('fa-spin-fast')
                    .addClass('fa-plus');

            }, 800);
        } else {
            card.addClass('mc-active');

            window.setTimeout(function() {
                icon
                    .removeClass('fa-plus')
                    .removeClass('fa-spin-fast')
                    .addClass('fa-minus');

            }, 800);
        }
    });
});