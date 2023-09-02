"use strict";

const initial_gridSize = 16;
let color = "#000000";

drawGrid(initial_gridSize / 2, initial_gridSize);
addButtonEventListeners();


// ADD GRADIENT ANIMATIONS BUTTON FOR FUN !!!


function addButtonEventListeners() {
  const toggleGrid_Button = document.getElementById("toggle-grid");

  toggleGrid_Button.addEventListener("click", toggleGrid);
}

function drawGrid(gridSize_Height, gridSize_Width) {
  // Display current grid size in slider value
  document.querySelector(".slider-value").textContent = `SIZE: ${gridSize_Height} X ${gridSize_Width}`;

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
    if (!event.target.style.backgroundColor &&
      event.target.classList.contains("grid-box")) {
      event.target.style.backgroundColor = color;
    }
}

// Changes the color of the boxes pressed AFTER the initial box
function changeSubsequentGridBoxColor(event) {
  // If the element DOES NOT have a background color 
  // AND left mouse button is being clicked
  // AND event is not triggered by a grid box not the container itself
  // then change it to currently selected color
  if (!event.target.style.backgroundColor &&
      event.buttons === 1 &&
      event.target.classList.contains("grid-box")) {
    event.target.style.backgroundColor = color;
  }
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
