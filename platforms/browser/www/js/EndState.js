function EndState(){
  var canvas = document.getElementById("myCanvas");
  this.context = canvas.getContext("2d");
  document.getElementById("myCanvas").addEventListener('mouseup', this.onTouchEnd, false);

  this.onTouchEnd = function(){
      console.log("go to game");
  }

  this.onStateUpdate = function(){
    this.context.fillText("End game", 50, 50);
  }
  this.onStateExit = function(){
    console.log("onStateExit");
  }
  this.onStateEnter = function(){

  }
}

EndState.prototype = new State();
