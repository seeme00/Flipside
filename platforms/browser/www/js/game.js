function Game(numCells, pixSize, moves){
  //Game states
  this.fsm = new FSM();

  this.initialize = function(){
    this.fsm.addState("INIT", new InitState());
    this.fsm.addState("GAME", new GameState(numCells, pixSize, moves));
    this.fsm.addState("END", new EndState());
    this.fsm.setState("GAME");
  }

  this.update = function(){
    this.fsm.update();
  }

  this.onTouchEnd = function(x, y){
    this.fsm.onTouchEnd(x, y);
  }
}
