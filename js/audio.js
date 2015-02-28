/**
 * This program is a utility for Audio API.
 * This program NEEDs to load before
 * a JavaScript file for main game is loaded.
 */
/**
 * Audio Context
 */
var context;
/**
 * Set of Sound Resources
 * This includes a path to sound file and
 * a buffer to insert the binary of sound data,
 *
 * These is related to a sound identifier.
 *
 * Example:
 * sounds['id'] =
 *   {path: '/path/to/', buffer: 'decoded data', source: 'sound source'}
 */
var sounds = {};
/**
 * load_sounds - Loading some sounds and initializing them.
 * @finished_func: callback function at load finished
 */
function load_sounds(finished_func){
  $.getJSON("resources.json", function(data){
    var cnt = 0;
    const NUMBER_OF_SOUNDS = data.sounds.length;
    /**
     * Read some pieces of information about sound in JSON file.
     */
    $.each(data.sounds, function(idx, sound){
      /**
       * Build a set of the sound.
       */
      sounds[sound.id] =
        {path: sound.dir+sound.file, buffer: null, source: null};

      /**
       * Loading a data from the path, and then decoding it.
       * Set the data to buffer.
       */
      (function(sound){
        var r = new XMLHttpRequest();
        r.open('GET', sound.path, true);
        r.responseType = 'arraybuffer';

        r.onload = function(){
          context.decodeAudioData(r.response, function(buf){
            sound.buffer = buf;
            if(++cnt >= NUMBER_OF_SOUNDS){
              finished_func();
            }
          });
        };
        r.send();
      })(sounds[sound.id]);
    });
  });
}

/**
 * build_sound - Build a sound source.
 * @loop  (optional): sound loop flag( defaults to false).
 * @volume(optional): sound volume( defaults to 1).
 * @func  (optional): callback function at the end of play.
 *
 * This function MUST be called before
 * play_sound() functioan is called.
 */
function build_sound(id, loop, volume, func){
  loop   = loop   === undefined? false: loop;
  volume = volume === undefined?     1: volume;
  func   = func   === undefined?  null: func;

  var s = context.createBufferSource();
  s.buffer = sounds[id].buffer;
  s.loop = loop;
  s.onended = func;
  sounds[id].source = s;
  var g = context.createGain();
  g.gain.value = volume;

  s.connect(g);
  g.connect(context.destination);
}
/**
 * play_sound - Play a sound.
 * @id                : sound identifier.
 * @when    (optional): a pause time until start( defaults to 0).
 * @offset  (optional): start time of the sound( defaults to 0).
 * @duration(optional): a number of seconds that be played.
 *
 * @when and @offset, @duration parameters are a unit of seconds.
 */
function play_sound(id, when, offset, duration){
  when   = when   === undefined?     0: when;
  offset = offset === undefined?     0: offset;

  if(duration === undefined)
    sounds[id].source.start(context.currentTime + when, offset);
  else
    sounds[id].source.start(context.currentTime + when, offset, duration);
}
/**
 * stop_sound - Stop a sound.
 * @id            : sound identifier
 * @when(optional): a pause time until start.
 *
 * @when parameter is a unit of seconds and defaults to 0.
 */
function stop_sound(id, when){
  when = when === undefined? 0: when;

  if(sounds[id].source)
    sounds[id].source.stop(when);
}
