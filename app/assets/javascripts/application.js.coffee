#= require jquery
#= require jquery_ujs
#= require bootstrap
#= require bootstrap-sprockets
#= require angular
#= require angular-rails-templates
#= require angular-ui-router
#= require angular-ng-dialog
#= require angular-input-match
#= require angular-email-available
#= require angular-file-input
#= require angular-redactor.directive
#= require angular-images.directive
#= require angular-image.directive
#= require toastr
#= require underscore
#= require i18n
#= require i18n/translations
#= require angular-range-slider
#= require_tree ../../../vendor/assets/javascripts/redactor
#= require twbs-pagination.js
#= require angular-bootstrap/ui-bootstrap-tpls
#= require selectize
#= require angular-bootstrap-lightbox
#= require metisMenu/jquery.metisMenu.js
#= require pace/pace.min.js
#= require peity/jquery.peity.min.js
#= require slimscroll/jquery.slimscroll.min.js
#= require inspinia.js
#= require wow
#= require scrollspy
#= require icheck
#= require spin
#= require slick/slick
#= require ladda
#= require angular-ladda
#= require angular-auth-http.service
#= require sweetalert/dist/sweetalert.min
#= require ngSweetAlert/SweetAlert
#= require angular-table-sort.directive
# load angular modules
#= require ./landing/application.module.js
#= require ./admin/application.module.js
#= require_tree ./admin/factories
#= require_tree ./admin/controllers
#= require_tree ./admin/templates
#= require_tree .

$(document).ready ->
  $('#side-menu').slimScroll
    height: '100%'