function MazeBox(opts) {
    const options = {
        row: 10,
        col: 10,
        value: MazeBox.weel,
        visited: false
    };
    options.marge(opts);
    this.marge(options);
    this.position = function (row, col) {
        if (typeof row === "undefined") {
            return [this.row, this.col];
        } else if (row instanceof Array) {
            col = row[1];
            row = row[0];
        }
        this.row = row;
        this.col = col;
    }
}
MazeBox.weel = 1;
MazeBox.roal = 0;
