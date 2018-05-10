function Res(opts) {
    const options = {
        row: 0,
        col: 0,
        name: "HP",
        collect: function (player) {
            player.hp(1);
            this.display = false;
        },
        color: "green",
        display: true,
        width: 10,
        height: 10
    };
    const _this = this;
    options.marge(opts);
    this.marge(options);
}
Res.prototype.render = function (ctx) {
    if (!this.display) return false;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.col * this.width, this.row * this.height, this.width, this.height);
}
