var is_initialize = false;

$(function(){

});

$(document).on('pageinit', '#wtitle', function(e, data){
    console.log('fire on title page');
    initialize();
});

$(document).on('pageinit', '#wintro', function(e, data){
    if(!is_initialize)
      $.mobile.changePage('#wtitle');
    console.log('fire on intro page');
});

$(document).on('pageinit', '#wpig', function(e, data){
    if(!is_initialize)
      $.mobile.changePage('#wtitle');
    console.log('fire on pig page');
});

$(document).on('pageinit', '#wuser', function(e, data){
    if(!is_initialize)
      $.mobile.changePage('#wtitle');
    console.log('fire on user page');
});

$(document).on('pageinit', '#weval', function(e, data){
    if(!is_initialize)
      $.mobile.changePage('#wtitle');
    console.log('fire on evaluation page');
});

/**
 * initialize - Initializing this main game program.
 */
function initialize(){
  /**
   * Whether a mobile device or not.
   */
  var is_mobile = 
    (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i
     .test(navigator.userAgent.toLowerCase()));
  if(is_mobile)
    ;//alert('Mobile');
  else
    console.log('Not mobile');

  /**
   * If window.Device[Motion|Orientation]Event is not supported
   * in the browser, this main game doesn't normally work.
   */
  if(!window.DeviceMotionEvent)
    alert('Not Support DeviceMotionEvent');
  if(!window.DeviceOrientationEvent)
    alert('Not Support DeviceMotionEvent');

  /**
   * Set the callback function for these event to EventListener.
   */
  /*
    window.addEventListener("devicemotion", motion_handler, false);
    window.addEventListener("deviceorientation", orientation_handler, false);
    */

  is_initialize = true;
}
