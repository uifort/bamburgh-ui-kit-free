
// Bootstrap Tooltip

$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

// Bootstrap Popover

$(function () {
    $('[data-toggle="popover"]').popover();
});

// Remove href functionality from href="#"

$('a[href="#"]').click(function (a) {
    a.preventDefault()
});

