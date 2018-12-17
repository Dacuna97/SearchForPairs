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

function initTable(game) {
    for (let i = 0; i < game.rows; ++i) {
        for (let j = 0; j < game.cols; ++j) {
            let back_img = $("<img>");
            back_img.attr("src", "back-card.jpg");
            let num = (i * game.cols + j) + 1;
            back_img.attr("id", `${num}`);
            let card = $("<div></div>");
            card.addClass("card");
            card = card.append(back_img);
            card = $(".cards").append(card);
        }
    }
}

/*function addCards(game) {
    let random_numbers = [];
    while (random_numbers.length != game.rows * game.cols) {
        let number = Math.floor(Math.random() * game.pairs);
        if (random_numbers.filter(element => element == number).length <= 1) {
            random_numbers.push(number);
        }
    }
    for (let i = 0; i < game.rows; ++i) {
        for (let j = 0; j < game.cols; ++j) {
            let num = i * game.cols + j;
            let front_img = $("<img>");
            front_img.attr("src", random_numbers[num] + ".jpg");
            front_img.addClass(`${i*game.cols + j}`);
            front_img.addClass("card_img");
            $(`#${num}`).append(front_img);
            $(".card_img").hide();
        }
    }
    return random_numbers;
}*/

$(() => {
    let game = getNewGame();
    $(".init-button").on("click", (event) => {
        let counter = 0;
        $(".card").remove();
        game = getNewGame();
        initTable(game);
        $(".cards>.card>img").on("click", (event) => {
            counter++;
            $(".header>.clicks>h1").text(`${counter} clicks`);
            let id = $(event.target).attr("id");
            let point = game.calculatePoint(id - 1);
            if (game.clickable(point)) { //if matrix has a negative value in point
                if (game.point == undefined) { //first click 
                    game.turnAround(point);
                    game.point = point;
                    $(`#${id}`).attr("src", `${game.matrix[point.x][point.y]}.jpg`);
                } else { //second click
                    $(`#${id}`).attr("src", `${game.matrix[point.x][point.y]*-1}.jpg`);
                    setTimeout(() => {
                        if (!game.check(point)) { //not the same
                            $(`#${id}`).attr("src", "back-card.jpg");
                            $(`#${game.calculateId(game.point)}`).attr("src", "back-card.jpg");
                            game.turnAround(game.point);
                            game.point = undefined;
                        } else { //yes the same
                            $(`#${id}`).addClass("hide-img");
                            $(`#${game.calculateId(game.point)}`).addClass("hide-img");
                            game.point = undefined;
                        }
                        if(game.win()){
                            alert("YOU WIN");
                        }
                    }, 300);
                }
            }   
        });
    });
});

function getNewGame() {
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
        console.log(this.matrix);
        //this.show();
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

    calculatePoint(pos) {
        return new Point(Math.floor(pos / this.cols), pos % this.cols);
    }

    calculateId(point) {
        return (point.x * this.cols) + point.y + 1;
    }
    check(point) {
        if (this.matrix[this.point.x][this.point.y] + this.matrix[point.x][point.y] == 0) {
            this.matrix[this.point.x][this.point.y] = undefined;
            this.matrix[point.x][point.y] = undefined;
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