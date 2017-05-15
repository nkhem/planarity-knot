const NullPoint = function () {
  this.pos = [];
  this.isMoving = false;
};

NullPoint.prototype.draw = function (ctx) {
  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.arc(
    this.pos[0], this.pos[1], 0, 0, 2 * Math.PI, true
  );
  ctx.fill();
};

module.exports = NullPoint;
