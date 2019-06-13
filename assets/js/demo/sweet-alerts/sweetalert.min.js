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

SweetAlert=(function(){var t=$('[data-toggle="sweet-alert"]');t.length&&t.on("click",(function(t){switch($(this).data("sweet-alert")){case"basic":swal.fire({title:"Here's a message!",text:"A few words about this sweet alert ...",buttonsStyling:!1,confirmButtonClass:"btn btn-primary"});break;case"info":swal.fire({title:"Info",text:"A few words about this sweet alert ...",type:"info",buttonsStyling:!1,confirmButtonClass:"btn btn-info"});break;case"success":swal.fire({title:"Success",text:"A few words about this sweet alert ...",type:"success",buttonsStyling:!1,confirmButtonClass:"btn btn-success"});break;case"warning":swal.fire({title:"Warning",text:"A few words about this sweet alert ...",type:"warning",buttonsStyling:!1,confirmButtonClass:"btn btn-warning"});break;case"question":swal.fire({title:"Are you sure?",text:"A few words about this sweet alert ...",type:"question",buttonsStyling:!1,confirmButtonClass:"btn btn-primary"});break;case"confirm":swal.fire({title:"Are you sure?",text:"You won't be able to revert this!",type:"warning",showCancelButton:!0,buttonsStyling:!1,confirmButtonClass:"btn btn-danger mr-3",confirmButtonText:"Yes, delete it!",cancelButtonClass:"btn btn-outline-primary"}).then(t=>{t.value&&swal.fire({title:"Deleted!",text:"Your file has been deleted.",type:"success",buttonsStyling:!1,confirmButtonClass:"btn btn-primary"})})}}))})();