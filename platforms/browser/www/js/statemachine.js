function FSM(){
  this.currentState = undefined;
  this.states = {};

  this.update = function(){
    if (this.currentState){
      this.currentState.onStateUpdate();
    }
  }

  this.onTouchEnd = function(x, y){
    this.currentState.onTouchEnd(x, y);
  }

  this.setState = function(name){
    if (this.currentState){
      this.currentState.onStateExit();
    }
    this.currentState = this.states[name];
    if (this.currentState){
      this.currentState.onStateEnter();
    }
  }

  this.addState = function(name, state){
    this.states[name] = state;
    state.fsm = this;
  }
}

function State(){
  this.fsm = undefined;
  this.onStateUpdate = function(){}
  this.onStateExit = function(){}
  this.onStateEnter = function(){}
  this.onTouchEnd = function(x, y){}
}
