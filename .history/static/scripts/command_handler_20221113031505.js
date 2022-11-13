// runCell() takes the code in the cell and outputs the result if there is a result or the error if there is an error
function runCell() {
    // disable the button from being run again until we process the current code
    runButton = document.getElementById('run');
    runButton.disabled = true;

    cellNum = document.getElementById(selectedCellNumber);
    // get text from the textarea
    text = cellNum.children[1].value;

    // Send the text to the python backend as a command
    // get the response from post request
    fetch('/evaluate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            command: text
        })
    }).then((response) => response.json()).then((data) => {
        // Insert the response below the respective code cell as a string 
        cellNum.children[2].innerText = data.result;

        // enable the button again
        runButton.disabled = false;
    });
}
