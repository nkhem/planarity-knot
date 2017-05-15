const Color = require("./color");
const Util = require("./util");

const Point = function (opts = {}) {
  this.pos = opts.pos;
  this.isMoving = false;
  this.bindEventHandlers();
};

Point.prototype.bindEventHandlers = function () {
  document.onmousedown = this.onMouseDown.bind(this);
  document.onmouseup = this.onMouseUp.bind(this);
};

Point.prototype.onMouseDown = function(e) {
  let mousePos = [e.offsetX, e.offsetY];
  if (this.isMouseOn(mousePos)) {
    this.isMoving = true;
    console.log(this);
    // document.onmousemove = this.onMouseMove;
    console.log('mousedown, e:', e);
    console.log('mousedown pos: [',e.offsetX, e.offsetY, ']');
  }
};

Point.prototype.onMouseUp = function(e){

  let mouseX = e.target.offsetLeft;
  let mouseY = e.target.offsetTop;
  let mousePos = [mouseX, mouseY];
  console.log('mouseup, e:', e);
  console.log('mouseup pos:', mousePos);
  // document.onmousemove = null;
  console.log(mousePos);
  if (this.isMouseOn(mousePos)) {
    this.isMoving = false;
  }
};

Point.prototype.onMouseMove = function(e){
  // console.log('mousemove, e:', e);
  //
  // let mouseX = parseInt(
  //   e.target.style.left.slice(0, e.target.style.left.length - 2)
  // );
  // let mouseY = parseInt(
  //   e.target.style.top.slice(0, e.target.style.top.length - 2)
  // );
  // let mousePos = [mouseX, mouseY];
  //
  // console.log(mousePos);
};

Point.prototype.isMouseOn = function(mousePos) {
  return Boolean(Util.POINT_RADIUS <= Util.distance(this.pos, mousePos));
};

Point.prototype.draw = function (ctx) {
  ctx.fillStyle = this.isMoving ? Color.MOVING_POINT : Color.STATIC_POINT;

  ctx.beginPath();
  ctx.arc(
    this.pos[0], this.pos[1], Util.POINT_RADIUS, 0, 2 * Math.PI, true
  );
  ctx.fill();
};

Point.hasEnoughSpace = function(newPos, takenPositions) {
  let hasEnoughSpace = true;
  takenPositions.forEach(function(pos) {
    let xTooClose = Boolean(Math.abs(newPos[0] - pos[0]) < 100);
    let yTooClose = Boolean(Math.abs(newPos[1] - pos[1]) < 100);
    if (xTooClose && yTooClose) {
      hasEnoughSpace = false;
    }
  });

  return hasEnoughSpace;
};

module.exports = Point;
