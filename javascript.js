"use strict";

const initial_gridSize = 16;

drawGrid(initial_gridSize / 2, initial_gridSize);





function drawGrid(gridSize_Height, gridSize_Width) {
  const gridContainer = document.querySelector(".grid-container");
  const gridFragment = new DocumentFragment();

  const gridSize_Area = gridSize_Height * gridSize_Width;
  for (let i = 0; i < gridSize_Area; i++) {
    let box = document.createElement("div");
    box.classList.add("grid-box");
    gridFragment.appendChild(box);
  }

  gridContainer.style.gridTemplateColumns = `repeat(${gridSize_Width}, auto)`;
  gridContainer.appendChild(gridFragment);
}