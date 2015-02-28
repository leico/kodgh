var is_initialize = false;

$(function(){
  $("#loading").addClass('loading');
  try{
    context = new (window.AudioContext || window.webkitAudioContext)();
    load_sounds(function(){
      $("#loading").removeClass('loading');
    });
  }catch(e){
    alert('Web Auid API is not supported');
  }
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
   * About the Map
   */
  var areas = [
    {code : 1, name: "北海道地方", color: "#7f7eda", hoverColor: "#b3b2ee", prefectures: [1]},
    {code : 2, name: "東北地方",   color: "#759ef4", hoverColor: "#98b9ff", prefectures: [2,3,4,5,6,7]},
    {code : 3, name: "関東地方",   color: "#7ecfea", hoverColor: "#b7e5f4", prefectures: [8,9,10,11,12,13,14]},
    {code : 4, name: "中部地方",   color: "#7cdc92", hoverColor: "#aceebb", prefectures: [15,16,17,18,19,20,21,22,23]},
    {code : 5, name: "近畿地方",   color: "#ffe966", hoverColor: "#fff19c", prefectures: [24,25,26,27,28,29,30]},
    {code : 6, name: "中国地方",   color: "#ffcc66", hoverColor: "#ffe0a3", prefectures: [31,32,33,34,35]},
    {code : 7, name: "四国地方",   color: "#fb9466", hoverColor: "#ffbb9c", prefectures: [36,37,38,39]},
    {code : 8, name: "九州地方",   color: "#ff9999", hoverColor: "#ffbdbd", prefectures: [40,41,42,43,44,45,46]},
    {code : 9, name: "沖縄地方",   color: "#eb98ff", hoverColor: "#f5c9ff", prefectures: [47]},
  ];

  $("#jpmap").japanMap({
    width: 330,
    selection: "area",
    areas: areas,
    backgroundColor : "#f2fcff",
    borderLineColor: "#f2fcff",
    borderLineWidth : 0.25,
    lineColor : "#a0a0a0",
    lineWidth: 1,
    drawsBoxLine: true,
    showsAreaName: true,
    areaNameType: 'short',
    movesIslands : true,
    fontSize : 10,
    onSelect : function(data){
      console.log(data.name); // Area Name
    }
  });

  is_initialize = true;
}
