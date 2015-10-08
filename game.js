var Game = function(){
  this.generationCount = 0
  this.grid = new Grid()
  this.board = new Board()
  this.initializeCellArrays()
  this.initializeEventListeners()
}

Game.prototype.initializeCellArrays = function(){
  this.cellsToStayAliveArray = []
  this.cellsToDieArray = []
}

Game.prototype.cellLiveOrDie = function(){
  var self = this
  
  var toStayAliveArray = []
  var toDieArray = []
  
  this.grid.iterate(function(cell){
    var liveCount = self.grid.findLiveNeighbors(cell.x, cell.y)
    if (cell.state){
      if (liveCount === 2 || liveCount === 3){
        toStayAliveArray.push(cell)
      }
      else{
        toDieArray.push(cell)
      }
    }
    else {
      if (liveCount === 3)
        toStayAliveArray.push(cell)
    }
    
  })
  
  this.cellsToDieArray = toDieArray
  this.cellsToStayAliveArray = toStayAliveArray
  this.setCellState()
}

Game.prototype.runIT = function(rows, cols){
  var self = this

  function runInterval(){
    var myIntervalVariable = setInterval(function(){
      self.cellLiveOrDie()
      self.generationCount += 1
      self.displayGenerationCounter()
    }, config.timeInterval)

    var resetHandler = $("body").on('click', '#reset', function(){
      clearInterval(myIntervalVariable)
      self.initializeCellArrays()
      self.setCellState()
      self.resetControlPanel()
      self.initializeEventListeners()
    })
  }
  setTimeout(function(){runInterval()}, config.startDelay)
}

Game.prototype.resetControlPanel = function(){
  var panel = $("#generation-container")
  output = "<h4>Pick A Pattern to Start -----></h4>"
  panel.html(output)
  this.generationCount = 0
}

Game.prototype.displayGenerationCounter = function(){
  var counter = $("#generation-container")
  var output = ""
  output += "<h4>"
  output += "Generation: " + this.generationCount
  output += "</h4>"
  counter.html(output)
}

Game.prototype.randomNum = function(){
  var randomNum = Math.floor( Math.random() * 100 )+1
  return randomNum
}

Game.prototype.randomInitialCellState = function(){
  var self = this
  for (var x=1; x<=config.maxRows; x++)
    for (var y=1; y<=config.maxCols; y++){
      this.grid.createCell(x, y, (self.randomNum() < 50) )
      
    }
}

Game.prototype.gliderInitialCellState = function(){
  var x = config.maxRows/2
  var gliderYPositionsArray = [20, 40, 60, 80, 100, 120]
  var gliderMultipleCoordinates = []
  gliderYPositionsArray.forEach(function(y){
    var gliderInitialCoordinates = [ [x-1, y], [x, y+1], [x+1, y-1], [x+1, y], [x+1, y+1] ]
    gliderInitialCoordinates.forEach(function(coordArray){
      gliderMultipleCoordinates.push(coordArray)
    })
  })
  return gliderMultipleCoordinates
}

Game.prototype.acornInitialCellState = function(){
  var x = config.maxRows/2
  var y = Math.floor(config.maxCols*2/3)
  var acornInitialCoordinates = [ [x-1, y+1], [x, y+3], [x+1, y], [x+1, y+1], [x+1, y+4], [x+1, y+5], [x+1, y+6] ]
  return acornInitialCoordinates
}

Game.prototype.rPentominoInitialCellState = function(){
  var x = config.maxRows/2
  var y = config.maxCols/2
  var rPentominoInitialCoordinates = [ [x-1, y+1], [x-1, y+2], [x, y], [x, y+1], [x+1, y+1]]
  return rPentominoInitialCoordinates
}

Game.prototype.gosperGliderGunInitialCellState = function(){
  var x = Math.floor(config.maxRows/2)
  var y = Math.floor(config.maxCols/6)
  var gosperGliderGunInitialCoordinates = [ [x-5, y+24],
                                            [x-4, y+22], [x-4, y+24],
                                            [x-3, y+12], [x-3, y+13], [x-3, y+20], [x-3, y+21], [x-3, y+34], [x-3, y+35],
                                            [x-2, y+11], [x-2, y+15], [x-2, y+20], [x-2, y+21], [x-2, y+34], [x-2, y+35],
                                            [x-1, y], [x-1, y+1], [x-1, y+10], [x-1, y+16], [x-1, y+20], [x-1, y+21],
                                            [x, y], [x, y+1], [x, y+10], [x, y+14], [x, y+16], [x, y+17], [x, y+22], [x, y+24],
                                            [x+1, y+10], [x+1, y+16], [x+1, y+24],
                                            [x+2, y+11], [x+2, y+15],
                                            [x+3, y+12], [x+3, y+13] ]
  return gosperGliderGunInitialCoordinates
}

Game.prototype.setCellState = function(){
  if (this.cellsToDieArray.length===0)
    this.board.clearGameTable()
  else
    this.cellsToDieArray.forEach(function(cellToDie){
      cellToDie.setState(false)
    })

  this.cellsToStayAliveArray.forEach(function(cellToLive){
    cellToLive.setState(true)
  })
}

Game.prototype.initializeGliderPattern = function(){
  this.cellsToStayAliveArray = this.gliderInitialCellState()
  this.runIT()
}

Game.prototype.initializeAcornPattern = function(){
  this.cellsToStayAliveArray = this.acornInitialCellState()
  this.runIT()
}

Game.prototype.initializeRPentominoPattern = function(){
  this.cellsToStayAliveArray = this.rPentominoInitialCellState()
  this.runIT()
}

Game.prototype.initializeGosperGliderGunPattern = function(){
  this.cellsToStayAliveArray = this.gosperGliderGunInitialCellState()
  this.runIT()
}

Game.prototype.initializeRandomPattern = function(){
  this.randomInitialCellState()
  this.runIT()
}

Game.prototype.initializeEventListeners = function(){
  var self = this

  $("body").on('click', '#glider', function(){
    self.stopEventListeners()
    self.initializeGliderPattern()
  })

  $("body").on('click', '#acorn', function(){
    self.stopEventListeners()
    self.initializeAcornPattern()
  })

  $("body").on('click', '#gosper', function(){
    self.stopEventListeners()
    self.initializeGosperGliderGunPattern()
  })

  $("body").on('click', '#rpentomino', function(){
    self.stopEventListeners()
    self.initializeRPentominoPattern()
  })

  $("body").on('click', '#random', function(){
    self.stopEventListeners()
    self.initializeRandomPattern()
  })
}

Game.prototype.stopEventListeners = function(){
  $("body").off('click', "#glider")
  $("body").off('click', "#acorn")
  $("body").off('click', "#gosper")
  $("body").off('click', "#rpentomino")
  $("body").off('click', "#random")
}
