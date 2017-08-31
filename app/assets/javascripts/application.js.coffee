#= require action_cable
#= require jquery
#= require jquery_ujs
#= require bootstrap
#= require bootstrap-sprockets
#= require angular
#= require angular-rails-templates
#= require angular-animate/angular-animate
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
#= require angular-ui-bootstrap/dist/ui-bootstrap
#= require angular-ui-bootstrap/dist/ui-bootstrap-tpls
#= require angular-bootstrap-lightbox
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
#= require angularjs-slider/dist/rzslider
#= require angular-sweetalert/SweetAlert
#= require angular-table-sort.directive
#= require ngAudio/ng-audio.directive
#= require angular-filter/dist/angular-filter
#= require ui-select/dist/select
#= require cropperjs/dist/cropper.min
#= require ion-sound/js/ion.sound
#= require_tree ./common
#= require_tree ./directives
#= require ./landing/application.module.js
#= require_tree ./landing/factories
#= require_tree ./landing/controllers
#= require_tree ./landing/templates
# require ./djs/application.module.js
# require_tree ./djs/factories
# require_tree ./djs/controllers
# require_tree ./djs/templates
# require ./organizers/application.module.js
# require_tree ./organizers/factories
# require_tree ./organizers/controllers
# require_tree ./organizers/templates

$(document).ready ->
  $('#side-menu').slimScroll
    height: '100%'

  resize = ->
    type = if (if window.navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i) then true else false) then 'mobile' else 'desktop'
    size = undefined

    orientation = 'portrait'
    size = if window.screen.width < 750 then 'small' else 'full'
    if window.screen.width >= window.screen.height
      orientation = 'landscape'
    $('body').attr 'device', type
    $('body').attr 'size', size
    $('body').attr 'orientation', orientation
    return

  hashchange = ->
    window.scrollTo 0, 0
    resize()
    return

  window.onresize = resize
  window.addEventListener 'resize', resize
  window.addEventListener 'hashchange', hashchange

  resize()

  ion.sound({
    sounds: [
      {
        name: "button_tiny"
      }
    ],
    volume: 1,
    path: "sounds/",
    preload: true
  })