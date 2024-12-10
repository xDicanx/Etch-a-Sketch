//START OF Grid generator
const gridDefaultSize = 16; //default size
let gridSizeUserDefined = gridDefaultSize;
createGrid(gridDefaultSize); //generates grid for the first time

function validateNumber(number) {
  //validates if the number is actually a rounded number between 1 and 100
  if (
    isNaN(number) ||
    number < 0 ||
    number > 100 ||
    !Number.isInteger(number)
  ) {
    return alert("Only round numbers between 1 and 100 are allowed");
  }
}

//Generates grid function
function createGrid(numberOfDivs) {
  if (!validateNumber(numberOfDivs)) {
    // const cellCount = parseInt(document.getElementById("cellCount").value);
    const gridContainer = document.querySelector(".etch-grid");
    const width = gridContainer.offsetWidth;
    gridContainer.innerHTML = "";
    // populates grid
    for (let i = 0; i < numberOfDivs; i++) {
      //creates row
      const row = document.createElement("div");
      row.classList.add("row");
      row.style.height = `${width / numberOfDivs}px`;
      //creates cells
      for (let j = 0; j < numberOfDivs; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.width = `${width / numberOfDivs}px`;

        //Validates if the cell is in a corner and adds an class to it
        if (i === 0 && j === 0) {
          cell.classList.add("corner-top-left");
        } else if (i === 0 && j === numberOfDivs - 1) {
          cell.classList.add("corner-top-right");
        } else if (i === numberOfDivs - 1 && j === 0) {
          cell.classList.add("corner-bottom-left");
        } else if (i === numberOfDivs - 1 && j === numberOfDivs - 1) {
          cell.classList.add("corner-bottom-right");
        }

        row.append(cell); //adds cell to row
      }
      //add row to the grid container
      gridContainer.appendChild(row);
    }
    assignCellEvents();
  }
}
//END OF Grid generator

//START OF generating random color for the cells

function getRandomColorForCell() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`; //get a random hex color
}

function assignCellEvents() {
  const gridCells = document.querySelectorAll(".cell"); //gets all the cells
  //add mouseover event listener to each cell
  gridCells.forEach((cell) => {
    cell.addEventListener("mouseover", () => {
      const randomColor = getRandomColorForCell(); //get random color
      cell.style.background = randomColor; //adds color to cell
    });
  });
}

//END OF generating random color for the cells

//START OF control functions
//clear grids
const clearBtn = document.querySelector(".clear-btn"); //gets the clear button
clearBtn.addEventListener("click", () => createGrid(gridSizeUserDefined)); //restarts the Etch-a-sketch with the last user input, if none, default size will be used -16-

//change grid size
const gridSizeBtn = document.querySelector(".gridSize-btn"); //gets the grid size button
//creates a new grid with the new value
gridSizeBtn.addEventListener("click", () => {
  gridSizeUserDefined = parseInt(prompt("Ingrese un valor")); //gets user input
  if (!validateNumber(gridSizeUserDefined)) {
    //validates if t
    createGrid(gridSizeUserDefined);
  }
});
//END OF control functions
