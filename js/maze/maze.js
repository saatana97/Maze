function Maze(opts) {
    const _this = this;
    const options = {
        row: 20,
        col: 10,
        x: 0,
        y: 0,
        width: 200,
        height: 400,
        entrance: [1, 1],
        resCount: 10
    }
    options.marge(opts);
    this.marge(options);
    this.row = this.row * 2 + 1;
    this.col = this.col * 2 + 1;
    this.boxsize = [this.width / this.col, this.height / this.row];
    this.boxes = [];
    this.restart();
}
Maze.prototype.restart = function () {
    this.boxes = [];
    this.unvisitedRoals = [];
    this.roals = [];
    for (var i = 0; i < this.row; i++) {
        this.boxes[i] = [];
        for (var j = 0; j < this.col; j++) {
            var isRoal = i % 2 !== 0 && j % 2 !== 0;
            var mazeBox = new MazeBox({ row: i, col: j, value: isRoal ? MazeBox.roal : MazeBox.weel });
            this.boxes[i][j] = mazeBox;
            if (isRoal) {
                this.unvisitedRoals.push(mazeBox);
                this.roals.push(mazeBox);
            }
        }
    }
    this.entrance = this.boxes[this.entrance[0]][this.entrance[1]];
    this.primGenerator();
    do {
        this.endpoint = Math.range(this.roals);
        var x = Math.abs(this.entrance.col - this.endpoint.col);
        var y = Math.abs(this.entrance.row - this.endpoint.row);
    } while (x < this.col * 0.7 && y < this.row * 0.7);
}
Maze.prototype.primGenerator = function () {
    var current = this.entrance;
    var queue = [];
    do {
        current.visited = true;
        var near = this.nearunvisitedRoals(current);
        var next = Math.range(near);
        if (next) {
            this.boxes[Math.avg(current.row, next[0])][Math.avg(current.col, next[1])].value = MazeBox.roal;
            queue.push(current);
            current = this.boxes[next[0]][next[1]];
        } else {
            current = queue.pop() || this.unvisited();
        }
    } while (current);
}
Maze.prototype.unvisited = function () {
    if (!this.entrance.visited) {
        return this.entrance;
    }
    if (this.unvisitedRoals.length === 0) {
        return false;
    }
    var index = Math.between(0, this.unvisitedRoals.length - 1);
    var item = this.unvisitedRoals[index];
    if (item.visited) {
        this.unvisitedRoals.splice(index, 1);
        return this.unvisited();
    } else {
        return item;
    }
}
Maze.prototype.nearRoals = function (row, col) {
    if (row instanceof Array) col = row[1], row = row[0];
    var result = [];
    row > 0 && this.boxes[row - 1][col].value === MazeBox.roal && result.push([row - 1, col]);
    col < this.col - 1 && this.boxes[row][col + 1].value === MazeBox.roal && result.push([row, col + 1]);
    row < this.row - 1 && this.boxes[row + 1][col].value === MazeBox.roal && result.push([row + 1, col]);
    col > 0 && this.boxes[row][col - 1].value === MazeBox.roal && result.push([row, col - 1]);
    return result;
}
Maze.prototype.isRoal = function (row, col) {
    if (row instanceof Array) col = row[1], row = row[0];
    var result = row >= 0 && col >= 0 && row < this.row && col < this.col && this.boxes[row][col].value === MazeBox.roal;
    return result;
}
Maze.prototype.nearunvisitedRoals = function (row, col) {
    if (row instanceof MazeBox) col = row.col, row = row.row;
    if (row instanceof Array) col = row[1], row = row[0];
    var result = [];
    if (row > 2 && this.boxes[row - 2][col].visited === false) {
        result.push([row - 2, col]);
    }
    if (col < this.col - 2 && this.boxes[row][col + 2].visited === false) {
        result.push([row, col + 2]);
    }
    if (row < this.row - 2 && this.boxes[row + 2][col].visited === false) {
        result.push([row + 2, col]);
    }
    if (col > 2 && this.boxes[row][col - 2].visited === false) {
        result.push([row, col - 2]);
    }
    return result;
}
Maze.prototype.render = function (ctx) {
    var width = this.boxsize[0];
    var height = this.boxsize[1];
    for (var row = 0; row < this.boxes.length; row++) {
        var y = row * height;
        for (var col = 0; col < this.boxes[row].length; col++) {
            var x = col * width;
            var box = this.boxes[row][col];
            if (box.value === MazeBox.weel) {
                ctx.fillStyle = "rgba(0,0,0,.1)";
            } else {
                ctx.fillStyle = "#fff";
            }
            ctx.fillRect(x, y, width, height);
        }
    }
    ctx.fillStyle = "blue";
    ctx.fillRect(this.entrance.col * width, this.entrance.row * height, width, height);
    ctx.fillStyle = "red";
    ctx.fillRect(this.endpoint.col * width, this.endpoint.row * height, width, height);
}
