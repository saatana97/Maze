function Tips() {
    this.display = true;
}
Tips.prototype.show = function () {
    this.display = true;
}
Tips.prototype.hide = function () {
    this.display = false;
}
Tips.prototype.render = function (ctx) {
    if (!this.display) return false;
    var width = canvas.width, height = canvas.height;
    ctx.fillStyle = "rgba(0,0,0,.7)";
    ctx.fillRect(0, 0, width, height);
    ctx.font = "32px Black";
    ctx.fillStyle = "red";
    ctx.fillText("W/↑ 向上移动", width / 2 - 150, height / 2 - 60);
    ctx.fillText("D/→ 向右移动", width / 2 - 150, height / 2 - 20);
    ctx.fillText("S/↓ 向下移动", width / 2 - 150, height / 2 + 20);
    ctx.fillText("A/← 向左移动", width / 2 - 150, height / 2 + 60);
    ctx.fillText("ESC 显示/隐藏本提示", width / 2 - 150, height / 2 + 100);
}
