function Window(x, y, size, ctx){
  this.lightUp = false;
  this.x = x;
  this.y = y;
  this.size = size; //Assume squares
  this.context = ctx;
  this.neighboors = new Array();

  this.collides = function(x, y){
    return x >= this.x && x < this.x + this.size && y >= this.y && y < this.y + this.size;
  }

  this.draw = function(){
    if (this.lightUp == false)
    {
      this.context.fillStyle="#00FF00";
    }
    else {
      this.context.fillStyle="#FF0000";
    }

    this.context.fillRect(this.x, this.y, this.size, this.size);
    this.context.strokeRect(this.x, this.y, this.size, this.size);
  }

  this.setNeighboors = function(neighboors){
    this.neighboors = this.neighboors.concat(neighboors);
  }

  this.flip = function(){
    for(var i = 0; i < this.neighboors.length; i++){
      this.neighboors[i].lightUp = !this.neighboors[i].lightUp;
    }
    this.lightUp = !this.lightUp;
  }
}
