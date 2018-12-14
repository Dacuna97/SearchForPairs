"use strict"

var params = Object.freeze({
    EASY: {
        rows: 2,
        cols: 6
    },
    MEDIUM: {
        rows: 4,
        cols: 6
    },
    DIFFICULT: {
        rows: 6,
        cols: 6
    }
});

$(() => {
    let game = getNewGame();

    $(".init-button").on("click", (event) => {
        game = getNewGame();
    });
});

function getNewGame(){
    let radioButton = $(".difficulty>label>input[type='radio']:checked");
    let param = params[radioButton.val().toUpperCase()];
    return new SearchPairs(param.rows, param.cols);
}

class SearchPairs {
    constructor(_rows, _cols) {
        this.reset(_rows, _cols);
    }

    reset(rows, cols) {
        this.rows = rows;
        this.cols = cols;

        this.point = undefined;

        this.pairs = this.rows * this.cols / 2;
        this.counter = 0;

        this.matrix = Array(this.rows).fill().map(element => Array(this.cols).fill(undefined));
        this.fillMatrix();
    }

    fillMatrix() {
        let values = Array(this.rows * this.cols).fill().map((element, index) => ((index - (index % 2)) / 2) + 1);
        for (let i = 0; i < this.rows; ++i) {
            for (let j = 0; j < this.cols; ++j) {
                let number = Math.floor(Math.random() * values.length);
                this.matrix[i][j] = values[number] * -1;
                values.splice(number, 1);
            }
        }
        this.show();
    }

    clickable(point) {
        return this.matrix[point.x][point.y] != undefined && this.matrix[point.x][point.y] < 0;
    }

    turnAround(point) {
        this.matrix[point.x][point.y] *= -1;
    }

    win() {
        return this.counter == this.pairs;
    }

    clickOn(x, y) {
        let point = new Point(x, y);
        if (this.clickable(point)) {
            if (this.point == undefined) {
                this.point = point;
                this.turnAround(this.point);
            } else {
                if (!this.check(point)) {
                    this.turnAround(this.point);
                    this.point = undefined;
                }
            }
        }
        if (!this.win()) {
            this.show();
        } else {
            console.log("win");
        }
    }

    check(point) {
        if (this.matrix[this.point.x][this.point.y] + this.matrix[point.x][point.y] == 0) {
            this.matrix[this.point.x][this.point.y] = undefined;
            this.matrix[point.x][point.y] = undefined;
            this.point = undefined;
            this.counter++;
            return true;
        }
        return false;
    }

    show() {
        console.log(
            this.matrix.map(
                row => {
                    let line = '-' + row.map(column => '---').join('-') + '-';
                    return '|' + row.map(
                        column => {
                            return ((column == undefined) ? '   ' : ((column < 0) ? ' x ' : ' ' + column + ((column >= 10) ? "" : " ")));
                        }
                    ).join('|') + '|\n' + line
                }
            ).join('\n')
        );
    }
}

class Point {
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
    }
}