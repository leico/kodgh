/**
 * Audio Context
 */
var context;

$(function(){
  try{
    context = new (window.AudioContext || window.webkitAudioContext)();
    load_sounds();
  }catch(e){
    alert('Web Auid API is not supported');
  }
});

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
 */
function load_sounds(){
  $.getJSON("resources.json", function(data){
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
          });
        };
        r.send();
      })(sounds[sound.id]);
    });
  });
}

/**
 * play_sound - Play a sound.
 * @id                : sound identifier
 * @when    (optional): a pause time until start.
 * @offset  (optional): start time of the sound.
 * @duration(optional): a number of seconds that be played.
 *
 * @when and @offset, @duration parameters are a unit of seconds.
 * @when and @offset parameters default to 0.
 */
function play_sound(id, when, offset, duration){
  when = when === undefined? 0: when;
  offset = offset === undefined? 0: offset;

  var s = context.createBufferSource();
  s.buffer = sounds[id].buffer;
  s.connect(context.destination);
  sounds[id].source = s;

  if(duration === undefined)
    s.start(when, offset);
  else
    s.start(when, offset, duration);
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
