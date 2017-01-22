var mouseX = 0;
var mouseY = 0;
var size = 500;
var game;

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        document.getElementById("myCanvas").addEventListener('mouseup', onTouchEnd, false);
        document.getElementById("myCanvas").addEventListener('mousemove', onMouseMove, false);
        setup();
    },
};

function setup(){
  var canvas = document.getElementById("myCanvas");
  canvas.width = size;
  canvas.height = size;
  var context = canvas.getContext("2d");

  game = new Game(5, size, 3, context);
  game.initialize();
  requestAnimationFrame(update);
}

function onMouseMove(evt){
  var rect =  document.getElementById("myCanvas").getBoundingClientRect();
  mouseX = evt.clientX - rect.left;
  mouseY = evt.clientY - rect.top;
}

function onTouchEnd(){
  game.onTouchEnd(mouseX, mouseY);
}

function update() {
    game.update();
    game.draw();

    requestAnimationFrame(update);
}



app.initialize();
