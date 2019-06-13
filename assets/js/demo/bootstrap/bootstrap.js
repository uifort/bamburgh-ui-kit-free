/*!
 =========================================================
 * Bamburgh UI Kit FREE v1.0.0
 =========================================================
 * Bamburgh is a FREE Bootstrap 4 UI Kit that is perfect for building highly customised presentation websites and application dashboards.
 * Product page: https://uifort.com/free-ui-kits/bamburgh-ui-kit-free.html
 * Copyright 2019 UiFort.com
 * MIT License
 * https://github.com/uifort/bamburgh-ui-kit-free/blob/master/LICENSE.md
 =========================================================
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. 
 */


// Bootstrap Tooltip

$((function () {
    $('[data-toggle="tooltip"]').tooltip();
}));

// Bootstrap Popover

$((function () {
    $('[data-toggle="popover"]').popover();
}));

// Remove href functionality from href="#"

$('a[href="#"]').click((function (a) {
    a.preventDefault()
}));

