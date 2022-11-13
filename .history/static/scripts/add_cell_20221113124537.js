let selectedCellNumber = 1; //  the id of the currently selected cell
let maxCellNumber = 1; // the total number of cells 

// adjusts the size of the text box depending on the text input. 
// If the text input becomes larger than the current size of the textbox 
// then we need to increase the size of the cell. 
function do_resize(textbox) {
    text = textbox.value;

    lines = text.split('\n');
    // resize the textbox to fit the text
    rows = lines.length == 1 ? lines.length + 1 : lines.length;

    textbox.rows = rows
}

// changes the selected cell based on an input cell.
function selecteCell(cell) {
    // unselect the current cell
    if (selectedCellNumber) {
        document.getElementById(selectedCellNumber).style.backgroundColor = "white";
    }

    // select the new cell
    selectedCellNumber = cell.id;
    document.getElementById(selectedCellNumber).style.backgroundColor = "#929ba76b";
}

// Ensure that the selected cell when the page is first opened is the first and only cell on the page
selecteCell(document.getElementById("1"))

// adds a cell below the current cells
function addCell() {
    maxCellNumber++;

    cellList = document.getElementById("cell-list");
    cellList.insertAdjacentHTML('beforeend',
        `<div class="cell" id="${maxCellNumber}" onclick="selecteCell(this)"> 
            <h4>[${maxCellNumber}]</h4>
            <textarea onkeyup="do_resize(this);"></textarea>
            <p></p>
        </div>`);

    // make the cell added as the selected 
    selecteCell(document.getElementById(maxCellNumber));
}