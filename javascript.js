"use strict";

let gridSize = 16;
let color = "#000000";

drawGrid();
addButtonEventListeners();






/*  NOTE - Right now the functions like toggle grid, reset board make changes 
    by iteration over each box one by one. Which is quite inefficient imo
    when you come back to this project then work on improving overall efficiency
    make grid container proportionately shrinkable and maybe add additional functionality
*/

function addButtonEventListeners() {
  const toggleGrid_Button = document.getElementById("toggle-grid");
  const eraser_Button = document.getElementById("eraser-button");
  const resetBoard_Button = document.getElementById("reset-board");
  const slider_Button = document.querySelector(".slider");
  const drawGrid_Button = document.getElementById("drawGrid-button");
  const colorPicker_Button = document.getElementById("color-picker");

  toggleGrid_Button.addEventListener("click", toggleGrid);
  eraser_Button.addEventListener("click", eraser);
  resetBoard_Button.addEventListener("click", resetBoard);
  slider_Button.addEventListener("input", sliderHandler);
  drawGrid_Button.addEventListener("click", drawGrid);
  colorPicker_Button.addEventListener("input", colorPicker);
}


function drawGrid() {
  const gridSize_Height = gridSize / 2;
  const gridSize_Width = gridSize;

  // Clear the container before drawing the grid
  const boxes = document.querySelectorAll(".grid-box");
  boxes.forEach(box => box.remove());

  const gridContainer = document.querySelector(".grid-container");

  // Disable the default behavior of selecting text on drag
  gridContainer.addEventListener("mousedown", (event) => {
    event.preventDefault();
  });

  const gridFragment = new DocumentFragment();

  const gridSize_Area = gridSize_Height * gridSize_Width;
  for (let i = 0; i < gridSize_Area; i++) {
    let gridBox = document.createElement("div");
    gridBox.classList.add("grid-box");
    gridFragment.appendChild(gridBox);
  }

  gridContainer.style.gridTemplateColumns = `repeat(${gridSize_Width}, auto)`;
  gridContainer.addEventListener("mousedown", changeGridBoxColor);
  gridContainer.addEventListener("mouseover", changeSubsequentGridBoxColor);
  gridContainer.appendChild(gridFragment);
}

// Changes the color of the initial box
function changeGridBoxColor(event) {
    if (event.target.classList.contains("grid-box")) {
      event.target.style.backgroundColor = color;
    }
}

// Changes the color of the boxes pressed AFTER the initial box
function changeSubsequentGridBoxColor(event) {
  // If the element DOES NOT have a background color 
  // AND left mouse button is being clicked
  // AND event is not triggered by a grid box not the container itself
  // then change it to currently selected color
  if (event.buttons === 1 &&
      event.target.classList.contains("grid-box")) {
    event.target.style.backgroundColor = color;
  }
}



function sliderHandler(event) {
  event.preventDefault();
  // y = 8 * 2^(x - 1)
  // Formula to get the desired values (y) of 8, 16, 32, 64, 128
  // Where event.target.value (x) is 1, 2, 3, 4, 5
  const value = 8 * 2**(event.target.value -1);
  gridSize = value;
  document.querySelector(".slider-value").textContent = `SIZE: ${value / 2} X ${value}`;  
}

function colorPicker(event) {
  color = event.target.value;
}

function eraser() {
  // Changes the box color on click to be pure white
  color = "#FFFFFF";
}

function resetBoard() {
  const boxes = document.querySelectorAll(".grid-box");
  boxes.forEach(box => {
    box.style.backgroundColor = "#FFFFFF";
  })
}

function toggleGrid(event) {
  event.target.classList.toggle("toggle-button-active");

  const boxes = document.querySelectorAll(".grid-box");
  boxes.forEach(box => {
    if (box.style.border === "unset") {
      box.style.border = "1px solid blue";
    } else {
      box.style.border = "unset";
    }
  });
}
