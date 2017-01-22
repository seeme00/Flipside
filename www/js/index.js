var dimension = 5;
var windows;
var size = 400;
var numMove = 3;
var mouseX = 0;
var mouseY = 0;
var rectSize = size / dimension;
var moves;
var currentCount = 0;

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        document.getElementById("myCanvas").addEventListener('mouseup', onTouchEnd, false);
        document.getElementById("myCanvas").addEventListener('mousemove', onMouseMove, false);
        setup();
    },
};

function onMouseMove(evt)
{
  var rect =  document.getElementById("myCanvas").getBoundingClientRect();
  mouseX = evt.clientX - rect.left;
  mouseY = evt.clientY - rect.top;
}

function onTouchEnd()
{
  var id = getIdFromCoord(mouseX, mouseY);
  if (id >= 0)
  {
    flipWindow(id);
    currentCount++;
  }
}

function getIdFromCoord(x, y)
{
  for(var i = 0; i < windows.length; i++)
  {
    var xmin = rectSize * (i % dimension);
    var xmax = xmin + rectSize;
    var ymin = Math.floor(i / dimension)*rectSize;
    var ymax = ymin + rectSize;

    if (x >= xmin && x < xmax && y >= ymin && y < ymax)
    {
      return i;
    }
  }
  return -1;
}

function setup()
{
  var canvas = document.getElementById("myCanvas");
  canvas.width = size;
  canvas.height = size;
  moves = new Array();
  currentCount = 0;
  windows = new Array();
  for(var i = 0; i < dimension * dimension; i++)
  {
    windows.push(false);
  }
  generateGrid();

  // Start things off
  requestAnimationFrame(update);
}

function flipWindow(index)
{

  var top = index < dimension;
  var bottom = index >= windows.length - dimension;
  var left = index % dimension == 0;
  var right = (index + 1) % dimension == 0;

  var indexes = new Array();

  if (!top && !left) {indexes.push(index - dimension - 1);}
  if (!top) {indexes.push(index - dimension);}
  if (!top && !right) {indexes.push(index - dimension + 1);}
  if (!left) {indexes.push(index - 1);}
  if (index >= 0 && index <= windows.length) {indexes.push(index);}
  if (!right) {indexes.push(index + 1);}
  if (!bottom && !left) {indexes.push(index + dimension - 1);}
  if (!bottom) {indexes.push(index + dimension);}
  if (!bottom && !right) {indexes.push(index + dimension + 1);}

  for (idx = 0; idx < indexes.length; idx++)
  {
    windows[indexes[idx]] = !windows[indexes[idx]];
  }
}

function generateGrid(reset)
{
  for(var i = 0; i < windows.length; i++)
  {
    windows[i] = false;
  }

  if (!reset)
  {
    moves = [];
    for(var i = 0; i < numMove; i++)
    {
      var idx = Math.floor(Math.random()*windows.length);
      moves.push(idx);
    }
  }

  for(var i = 0; i < moves.length; i++)
  {
    flipWindow(moves[i]);
  }
}

function hasWon()
{
  for(var i = 0; i < windows.length; i++)
  {
    if (windows[i]) return false;
  }
  return true;
}

function update() {
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");

    var won = hasWon();
    if (won || currentCount >= numMove)
    {
      console.log("reset game? ", !won && currentCount >= numMove);
      generateGrid(!won && currentCount >= numMove);
      currentCount = 0;
    }

    ctx.strokeStyle="#000000";
    for(var i = 0; i < windows.length; i++)
    {
      if (windows[i] == false)
      {
        ctx.fillStyle="#00FF00";
      }
      else {
        ctx.fillStyle="#FF0000";
      }

      ctx.fillRect(rectSize * (i % dimension), Math.floor(i / dimension)*rectSize , rectSize, rectSize);
      ctx.strokeRect(rectSize * (i % dimension), Math.floor(i / dimension)*rectSize , rectSize, rectSize);
    }

    requestAnimationFrame(update);
}



app.initialize();
