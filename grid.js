var Grid = function(){

}

Grid.prototype.createCell = function(x, y, stat) {
  this[x] = this[x] || {};
  this[x][y] = new Cell(x, y, stat)
}

//live neighbors counter
Grid.prototype.findLiveNeighbors = function (x, y){
  var self = this
  var activeCells = 0

  for (xof = -1; xof <= 1; xof++) {
    for (yof = -1; yof <= 1; yof++) {
      if (xof !== 0 || yof !== 0) {
        var check = self.cellExist(x+xof, y+yof)
        if(check && check.state)
          activeCells++
      }
    }
  }
  return activeCells
}

Grid.prototype.iterate = function( action ) {
  var x, y;
  for (x in this) 
    if (this.hasOwnProperty( x )) 
      for (y in this[x]) 
        if (this[x].hasOwnProperty( y ))
          action( this[x][y] );

};

Grid.prototype.cellExist = function (x, y){
  return this[x] && this[x][y]
}