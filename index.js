"use strict"

$(() => {
   new SearchPairs(5, 4);
});

class SearchPairs {
    constructor(_rows, _cols) {
        this.rows = _rows;
        this.cols = _cols;
        this.matrix = Array(this.rows).fill(Array(this.cols).fill(undefined));
        this.fillMatrix();
    } 

    fillMatrix() {
        let values = Array(this.rows * this.cols).fill().map((element, index) => (index - (index % 2)) / 2);
        values
        console.log(values);
        let counter;
        for (let i = 0; i < this.rows; ++i){
            this.matrix.push([]);
            for (let j = 0; j < this.cols; ++j){
                counter = (i * this.cols) + j;

            }
        }
    }
}