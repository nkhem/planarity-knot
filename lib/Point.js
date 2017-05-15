const Color = require("./color");
const Util = require("./util");

const Point = function (opts = {}) {
  this.pos = opts.pos;
  this.isMoving = false;
  this.bindEventHandlers();
};

Point.prototype.isMouseOn = function(mousePos) {
  return Boolean(Util.POINT_RADIUS <= Util.distance(this.pos, mousePos));
};

Point.prototype.bindEventHandlers = function () {
  document.onmousedown = OnMouseDown;
  document.onmouseup = OnMouseUp;
};

function OnMouseUp(e){
  let mousePos = [e.offsetX, e.offsetY];
  console.log('mouseup, e:', e);
  document.onmousemove = null;
  if (this.isMouseOn(mousePos)) {
    this.isMoving = false;
  }
}

function OnMouseMove(e){
  console.log('mousemove, e:', e);
}

function OnMouseDown(e){
  let mousePos = [e.offsetX, e.offsetY];
  if (this.isMouseOn(mousePos)) {
    this.isMoving = true;
    document.onmousemove = OnMouseMove;
    console.log('mousedown, e:', e);
    console.log('mousedown pos: [',e.offsetX, e.offsetY, ']');
  }
}

Point.prototype.draw = function (ctx, color) {
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
