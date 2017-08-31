#= require jquery
#= require jquery_ujs
#= require bootstrap
#= require bootstrap-sprockets
#= require angular
#= require angular-rails-templates
#= require angular-ui-router
#= require ng-dialog/js/ngDialog
#= require angular-input-match
#= require angular-email-available
#= require angular-redactor.directive
#= require angular-images.directive
#= require angular-image.directive
#= require angular-country.directive
#= require ngAudio/ng-audio.directive
#= require toastr
#= require underscore
#= require i18n
#= require i18n/translations
#= require angular-range-slider
#= require_tree ../../../vendor/assets/javascripts/redactor
#= require twbs-pagination.js
#= require angular-ui-bootstrap/dist/ui-bootstrap-tpls
#= require metisMenu/jquery.metisMenu.js
#= require pace/pace.min.js
#= require slimscroll/jquery.slimscroll.min.js
#= require inspinia.js
#= require wow
#= require scrollspy
#= require spin
#= require ladda
#= require angular-ladda
#= require angular-auth-http.service
#= require sweetalert/dist/sweetalert.min
#= require angular-sweetalert/SweetAlert
#= require angular-table-sort.directive
#= require cropperjs/dist/cropper.min
#= require jquery-price-format/jquery.priceformat
#= require angular-drag-and-drop-lists
# load angular modules
#= require_tree ./directives
#= require ./admin/application.module.js
#= require_tree ./admin/factories
#= require_tree ./admin/controllers
#= require_tree ./admin/templates

$(document).ready ->
  $('#side-menu').slimScroll
    height: '100%'