var Cell = function(x, y, stat){
	this.x = x
  this.y = y
  // active/inactive
  this.setState(stat)
}

Cell.prototype.setState = function(stat){
  this.state = stat
  this.classe = (this.state) ? 'active' : 'inactive'
  this.setClasse()
}

Cell.prototype.getId = function(){
  return "#"+ this.x + "-" + this.y
}

Cell.prototype.setClasse = function(){
  $(this.getId()).attr('class', this.classe)
}