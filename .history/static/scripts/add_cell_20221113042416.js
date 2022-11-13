let currentCellNum = 1; //  the id of the currently selected cell
let totalCellNum = 1; // the total number of cells 

// adjusts the size of the text box depending on the text input. 
// If the text input becomes larger than the current size of the textbox 
// then we need to increase the size of the cell. 
function do_resize(textbox) {
    var maxrows = 50;
    var txt = textbox.value;
    var cols = textbox.cols;

    var arraytxt = txt.split('\n');
    var rows = arraytxt.length;

    for (i = 0; i < arraytxt.length; i++)
        rows += parseInt(arraytxt[i].length / cols);

    if (rows > maxrows) textbox.rows = maxrows;
    else textbox.rows = rows;
}

// changes the selected cell based on an input cell.
function selecteCell(cell) {
    if (currentCellNum) {
        document.getElementById(currentCellNum).style.backgroundColor = "white";
    }
    currentCellNum = cell.id;
    document.getElementById(currentCellNum).style.backgroundColor = "rgba(228, 126, 58, 0.195)";
}

// Ensure that the selected cell when the page is first opened is the first and only cell on the page
selecteCell(document.getElementById("1"))

function addCell() {
    totalCellNum++;
    cellList = document.getElementById("cell-list");
    cellList.insertAdjacentHTML('beforeend',
        `<div class="cell" id="${totalCellNum}" onclick="selecteCell(this)"> 
            <h4>[${totalCellNum}]</h4>
            <textarea onkeyup="do_resize(this);"></textarea>
            <p></p>
        </div>`);

    selecteCell(document.getElementById(totalCellNum));
}