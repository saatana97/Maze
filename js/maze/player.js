function Player(opts) {
  const _this = this;
  const options = { row: 1, col: 1, width: 10, height: 10, speed: 200, direct: [0, 0], maxHP: 10 };
  options.marge(opts);
  this.marge(options);
  this.x = this.col * this.width;
  this.y = this.row * this.height;
  var _hp = this.maxHP;
  this.hp = function (number) {
    if (number instanceof Number) {
      _hp += number;
      _hp = Math.min(_hp, this.maxHP);
    } else {
      return _hp;
    }
  }
}
Player.prototype.update = function (detail) {
  if (this.direct[0] === 0 && this.direct[1] === 0) {
    return false;
  }
  var distance = detail * this.speed / 1000;
  var x = this.x + distance * this.direct[1];
  var y = this.y + distance * this.direct[0];
  var col = Math.round(x / this.width);
  var row = Math.round(y / this.height);
  if (this.maze.isRoal(row, col)) {
    this.x = x;
    this.y = y;
    this.row = row;
    this.col = col;
  } else {
    this.x = this.col * this.width;
    this.y = this.row * this.height;
    this.direct = [0, 0];
  }
}
Player.prototype.render = function (ctx) {
  ctx.fillStyle = "orange";
  ctx.fillRect(this.x + this.width / 4, this.y + this.height / 4, this.width / 2, this.height / 2);
}
