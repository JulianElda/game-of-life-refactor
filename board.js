var Board = function(){
  this.createGameTable()
}

Board.prototype.createGameTable = function(){
  tableElement = "<table id='game-table' border='3'></table>"
  divContainer = $('#game-container')
  divContainer.html(tableElement)
  this.createRowsAndColsOfGameTable(config.maxRows,config.maxCols)
}

Board.prototype.createRowsAndColsOfGameTable = function(rows,cols){
  var addRows = ""
  for(var i=1; i<=rows; i++){
    var addCols = ""
    for (var j=1; j<=cols; j++){
      addCols = addCols + "<td "
      addCols = addCols + "id='" + i + "-" + j + "' "
      addCols = addCols + "height='"+config.height+"' "
      addCols = addCols + "width='"+config.width+"' "
      addCols = addCols + "class='inactive'"
      addCols = addCols + ">"
      // addCols = addCols + i + ", " + j
      addCols = addCols + "</td>"
    }
    addRows = addRows + "<tr id='row" + i + "' class='cells'>" + addCols + "</tr>"
  }
  var table = $('#game-table')
  table.html(addRows)
}

