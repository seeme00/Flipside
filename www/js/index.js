var dimension = 5;
var windows = new Array();
var size = 400;
var numMove = 3;
var mouseX = 0;
var mouseY = 0;
var rectSize = size / dimension;
var moves = new Array();
var currentCount = 0;

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
  for(var i = 0; i < dimension * dimension; i++)  {
    var x = rectSize * (i % dimension);
    var y = Math.floor(i / dimension)*rectSize;
    windows.push(new Window(x, y, rectSize, context));
  }

  for(var i = 0; i < windows.length; i++)  {
    windows[i].setNeighboors(getNeighboors(i));
  }
  generateGrid();
  requestAnimationFrame(update);
}

function getNeighboors(index){
  var top = index < dimension;
  var bottom = index >= windows.length - dimension;
  var left = index % dimension == 0;
  var right = (index + 1) % dimension == 0;

  var indexes = new Array();

  if (!top && !left) {indexes.push(index - dimension - 1);}
  if (!top) {indexes.push(index - dimension);}
  if (!top && !right) {indexes.push(index - dimension + 1);}
  if (!left) {indexes.push(index - 1);}
  //if (index >= 0 && index <= windows.length) {indexes.push(index);}
  if (!right) {indexes.push(index + 1);}
  if (!bottom && !left) {indexes.push(index + dimension - 1);}
  if (!bottom) {indexes.push(index + dimension);}
  if (!bottom && !right) {indexes.push(index + dimension + 1);}

  var wins = new Array();
  for (var i = 0; i < indexes.length; i++){
    wins.push(windows[indexes[i]]);
  }

  return wins;
}

function onMouseMove(evt){
  var rect =  document.getElementById("myCanvas").getBoundingClientRect();
  mouseX = evt.clientX - rect.left;
  mouseY = evt.clientY - rect.top;
}

function onTouchEnd(){
  var id = getIdFromCoord(mouseX, mouseY);
  if (id >= 0)  {
    windows[id].flip();
    currentCount++;
  }
}

function getIdFromCoord(x, y){
  for(var i = 0; i < windows.length; i++)  {
    if (windows[i].collides(x, y)){
      return i;
    }
  }
  return -1;
}

function generateGrid(reset){
  for(var i = 0; i < windows.length; i++)  {
    windows[i].lightUp = false;
  }

  if (!reset)  {
    moves = [];
    for(var i = 0; i < numMove; i++)    {
      var idx = Math.floor(Math.random()*windows.length);
      moves.push(idx);
    }
  }

  for(var i = 0; i < moves.length; i++)  {
    windows[moves[i]].flip();
  }
}

function hasWon(){
  for(var i = 0; i < windows.length; i++)  {
    if (windows[i].lightUp) return false;
  }
  return true;
}

function update() {
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");

    var won = hasWon();
    if (won || currentCount >= numMove)    {
      console.log("reset game? ", !won && currentCount >= numMove);
      generateGrid(!won && currentCount >= numMove);
      currentCount = 0;
    }

    ctx.strokeStyle="#000000";
    for(var i = 0; i < windows.length; i++)    {
      windows[i].draw();
    }

    requestAnimationFrame(update);
}



app.initialize();
