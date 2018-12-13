"use strict"

$(() => {
    var game = new SearchPairs(5, 4);
});

class SearchPairs {
    constructor(_rows, _cols) {
        this.rows = _rows;
        this.cols = _cols;

        this.point = undefined;

        this.matrix = Array(this.rows).fill().map(element => Array(this.cols).fill(undefined));
        this.fillMatrix();
    }

    fillMatrix() {
        let values = Array(this.rows * this.cols).fill().map((element, index) => (index - (index % 2)) / 2);
        for (let i = 0; i < this.rows; ++i) {
            for (let j = 0; j < this.cols; ++j) {
                let number = Math.floor(Math.random() * values.length);
                this.matrix[i][j] = values[number];
                values.splice(number, 1);
            }
        }
    }

    clickOn(x, y) {
        let point = new Point(x, y);
        if (this.point == undefined) {
            this.point = point;
        } else {
            check(point);
            this.point = undefined;
        }
    }

    check(point) {
        if (this.matrix[this.point.x][this.point.y] == this.matrix[point.x][point.y]) {
            this.matrix[this.point.x][this.point.y] = undefined;
            this.matrix[point.x][point.y] = undefined;
        }
    }
}

class Point {
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
    }
}