function Game(numCells, pixSize, moves, context){
  //Game states
  this.GameStates = {
    INIT: "INIT",
    SHUFFLE: "SHUFFLE"    
  }

  //Various "static" state
  this.numCells = numCells;
  this.pixSize = pixSize;
  this.context = context;
  this.numMoves = moves;
  this.numCellsq = this.numCells * this.numCells;
  this.rectSize = pixSize / numCells;

  //Move history
  this.moves = new Array();
  this.currentCount = 0;

  //windows
  this.windows = new Array();

  this.initialize = function(){
    for(var i = 0; i < this.numCellsq; i++)  {
      var x = this.rectSize * (i % this.numCells);
      var y = Math.floor(i / this.numCells)*this.rectSize;
      this.windows.push(new Window(x, y, this.rectSize, this.context));
    }

    for(var i = 0; i < this.windows.length; i++)  {
      this.windows[i].setNeighboors(this.getNeighboors(i));
    }
    this.generateGrid();
  }

  this.onTouchEnd = function(x, y){
    var id = this.getIdFromCoord(x, y);
    if (id >= 0)  {
      this.windows[id].flip();
      this.currentCount++;
    }
  }

  this.getIdFromCoord = function(x, y){
    for(var i = 0; i < this.windows.length; i++)  {
      if (this.windows[i].collides(x, y)){
        return i;
      }
    }
    return -1;
  }

  this.hasWon = function(){
    for(var i = 0; i < this.windows.length; i++)  {
      if (this.windows[i].lightUp) return false;
    }
    return true;
  }

  this.getNeighboors = function(index){
    var top = index < this.numCells;
    var bottom = index >= this.windows.length - this.numCells;
    var left = index % this.numCells == 0;
    var right = (index + 1) % this.numCells == 0;

    var indexes = new Array();

    if (!top && !left) {indexes.push(index - this.numCells - 1);}
    if (!top) {indexes.push(index - this.numCells);}
    if (!top && !right) {indexes.push(index - this.numCells + 1);}
    if (!left) {indexes.push(index - 1);}
    if (!right) {indexes.push(index + 1);}
    if (!bottom && !left) {indexes.push(index + this.numCells - 1);}
    if (!bottom) {indexes.push(index + this.numCells);}
    if (!bottom && !right) {indexes.push(index + this.numCells + 1);}

    var wins = new Array();
    for (var i = 0; i < indexes.length; i++){
      wins.push(this.windows[indexes[i]]);
    }

    return wins;
  }

   this.generateGrid = function(reset){
    for(var i = 0; i < this.windows.length; i++)  {
      this.windows[i].lightUp = false;
    }

    if (!reset)  {
      this.moves = [];
      for(var i = 0; i < this.numMoves; i++)    {
        var idx = Math.floor(Math.random()*this.windows.length);
        this.moves.push(idx);
      }
    }

    for(var i = 0; i < this.moves.length; i++)  {
      this.windows[this.moves[i]].flip();
    }
  }

  this.update = function(){
    var endGame = this.hasWon();
    if (endGame || this.currentCount >= this.numMoves)    {
      console.log("reset game");
      this.generateGrid(!endGame && this.currentCount >= this.numMoves);
      this.currentCount = 0;
    }
  }

  this.draw = function(){
    this.context.strokeStyle="#000000";
    for(var i = 0; i < this.windows.length; i++)    {
      this.windows[i].draw();
    }
  }
}
