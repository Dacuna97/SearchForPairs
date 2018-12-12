"use strict"
/*function insertMatrix(selector, matriz){
    $(selector).append(matriz);
}*/
function insertMatrix(selector, matriz, callback) {
    $(selector).append(matriz);
    $("table").on("click", "td", callback);
}

function createMatrix(matriz) {
    let new_matrix = $("<table></table>");
    matriz.forEach(row => {
        let tr = $("<tr></tr>");
        row.forEach(element => {
            let new_elem = $("<td></td>");
            new_elem.text(element);
            tr.append(new_elem);
        })
        new_matrix.append(tr);
    });
    return new_matrix;
}


$(function () {
    let m = [
        ["Esto", "es", "una fila"],
        ["aquí", "va", "otra fila"],
        ["y", "aquí", "otra más"]
    ];
    let matriz = createMatrix(m);
    insertMatrix("div", matriz, (event) => {
        let elementoPulsado = $(event.target);
        alert("Has hecho clic en " + elementoPulsado.text());
    });
});