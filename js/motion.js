/**
 * This program is a process to get a direction from
 * an acceleration of each axis.
 */
/**
 * If acceleration is more than the threshold,
 * get a direction.
 */
const THRESHOLD = 5;
/*
 * The x and y, z is an axis.
 * accel: Acceleration
 * ready: Whether ready for getting acceleration.
 * count: Count a number of if acceleration is zero.
 */
var x = {accel: 0, ready: true, count: 0};
//var y = {accel: 0, ready: true, count: 0};
//var z = {accel: 0, ready : true, count : 0};
/*
 * Count a time of interval to get an acceleration.
 */
var cntint = 0;
/**
 * motion_handler - Callback function for DeviceMotionEvent
 */
function motion_handler(event) {
  x.accel = Math.round(event.accelerationIncludingGravity.x * 10) / 10;
  //y.accel = Math.round(event.accelerationIncludingGravity.y * 10) / 10;
  //z.accel = Math.round(event.accelerationIncludingGravity.z * 10) / 10;
  //cntint += event.interval;

  // For X Axis
  x.accel = parseInt(x.accel);
  if(Math.abs(x.accel) > THRESHOLD){
    if(x.ready){
      x.ready = false;
      if(x.accel > 0)
        ;//('→');
      else if(x.accel < 0)
        ;//('←');
    }
  } else if (!x.accel){
    if (++x.count > 5) {
      x.count = 0;
      x.ready = true;
    }
  }

  // For Y Axis
  // For Z Axis
}
