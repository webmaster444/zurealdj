#= require jquery
#= require jquery_ujs
#= require bootstrap
#= require bootstrap-sprockets
#= require angular
#= require angular-rails-templates
#= require angular-resource
#= require angular-ui-router
#= require ng-dialog/js/ngDialog
#= require angular-input-match
#= require angular-email-available
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
#= require angular-bootstrap/ui-bootstrap
#= require angular-bootstrap/ui-bootstrap-tpls
#= require angular-bootstrap-lightbox
#= require metisMenu/jquery.metisMenu.js
#= require pace/pace.min.js
#= require peity/jquery.peity.min.js
#= require slimscroll/jquery.slimscroll.min.js
#= require inspinia.js
#= require wow
#= require scrollspy
#= require spin
#= require ladda
#= require angular-ladda
#= require angular-auth-http.service
#= require sweetalert/lib/sweet-alert
#= require angular-sweetalert/SweetAlert
#= require angular-table-sort.directive
#= require ./landing/application.module.js
#= require_tree ./landing/factories
#= require_tree ./landing/controllers
#= require_tree ./landing/templates
#= require ./djs/application.module.js
#= require_tree ./djs/factories
#= require_tree ./djs/controllers
#= require_tree ./djs/templates
#= require ./organizers/application.module.js
#= require_tree ./organizers/factories
#= require_tree ./organizers/controllers
#= require_tree ./organizers/templates

$(document).ready ->
  $('#side-menu').slimScroll
    height: '100%'

  resize = ->
    type = if (if window.navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i) then true else false) then 'mobile' else 'desktop'
    size = undefined

    orientation = 'portrait'
    if type == 'mobile'
      if window.screen.width < 768 or window.screen.height < 768
        size = 'small'
      else
        size = 'full'
    else
      size = 'full'
    if window.screen.width >= window.screen.height
      orientation = 'landscape'
    $('[version=\'true\']').attr 'device', type
    $('[version=\'true\']').attr 'size', size
    $('[version=\'true\']').attr 'orientation', orientation
    return

  window.addEventListener 'resize', resize
  window.addEventListener 'hashchange', resize

  resize()