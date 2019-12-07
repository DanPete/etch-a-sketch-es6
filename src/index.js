// import Picker from "vanilla-picker";

const gridContainer = document.querySelector(".container-sketch");

let mouseButtonPressed = false;

window.addEventListener("mousedown", e => {
  if (e) {
    mouseButtonPressed = true;
  }
});
window.addEventListener("mouseup", e => {
  if (e) {
    mouseButtonPressed = false;
  }
});

function createGrid(size) {
  let containerSize = gridContainer.scrollWidth;
  Array.from(Array(size)).forEach(x => {
    const row = document.createElement("div");
    Array.from(Array(size)).forEach(x => {
      const column = document.createElement("div");
      column.classList.add("column");
      column.style.height = `${containerSize / size}px`;
      row.appendChild(column);
    });
    row.classList.add("row");
    gridContainer.appendChild(row);
  });
}

createGrid(16);

const basic = document.querySelector(".basic");
const random = document.querySelector(".random");
const real = document.querySelector(".real");
const clear = document.querySelector(".clear");
const resize = document.querySelector(".resize");
const colors = document.querySelectorAll(".color");
const currentColor = document.querySelector(".current");
const clickCheck = document.querySelector("#click-check");

initListeners();

let colorMode = "normal";
let cellColor = `black`;

var parent = document.querySelector("#color-picker");
var picker = new Picker(parent);

picker.onChange = function(color) {
  if (colorMode !== "real") colorMode = "normal";
  cellColor = color.rgbaString;
  currentColor.style.backgroundColor = color.rgbaString;
};

function colorCell() {
  // console.log(mouseButtonPressed);
  if (mouseButtonPressed && clickCheck.checked) {
    if (colorMode === "normal") {
      this.style.backgroundColor = cellColor;
    } else if (colorMode === "random") {
      function randomColor(brightness) {
        function randomChannel(brightness) {
          var r = 255 - brightness;
          var n = 0 | (Math.random() * r + brightness);
          var s = n.toString(16);
          return s.length === 1 ? "0" + s : s;
        }
        return (
          "#" +
          randomChannel(brightness) +
          randomChannel(brightness) +
          randomChannel(brightness)
        );
      }
      function getRandomColor() {
        let color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        return color;
      }
      this.style.backgroundColor = `${getRandomColor()}`;
    } else if (colorMode === "real") {
      this.style.backgroundColor = cellColor;
      this.style.opacity -= "-0.1";
    }
  }
  if (!mouseButtonPressed && !clickCheck.checked) {
    if (colorMode === "normal") {
      this.style.backgroundColor = cellColor;
    } else if (colorMode === "random") {
      function randomColor(brightness) {
        function randomChannel(brightness) {
          var r = 255 - brightness;
          var n = 0 | (Math.random() * r + brightness);
          var s = n.toString(16);
          return s.length === 1 ? "0" + s : s;
        }
        return (
          "#" +
          randomChannel(brightness) +
          randomChannel(brightness) +
          randomChannel(brightness)
        );
      }
      function getRandomColor() {
        let color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        return color;
      }
      this.style.backgroundColor = `${getRandomColor()}`;
    } else if (colorMode === "real") {
      this.style.backgroundColor = cellColor;
      this.style.opacity -= "-0.1";
    }
  }
}

function setColor() {
  if (colorMode !== "real") colorMode = "normal";
  currentColor.style.backgroundColor = this.dataset.color;
  cellColor = this.dataset.color;
}

function clearCells() {
  const cellsToClear = document.querySelectorAll(".column");
  cellsToClear.forEach(
    cell => (cell.style.cssText += "background: white; opacity: initial")
  );
}

function resizeGrid() {
  gridContainer.innerHTML = "";
  let grid = prompt("Enter you grid size", 30) || 16;
  if (isNaN(grid)) {
    grid =
      prompt("Sorry that wasn't a number. Please enter a number", 30) || 16;
  }
  if (isNaN(grid)) {
    alert("Sorry that wan't a number again. We'll set the grid to 16");
    grid = 16;
  }
  const gridInt = Number(grid);
  createGrid(gridInt);
  initListeners();
}

function initListeners() {
  const cells = document.querySelectorAll(".column");
  cells.forEach(cell => cell.addEventListener("mouseenter", colorCell));
  // cells.forEach(cell => cell.addEventListener("click", colorCell));
  clear.addEventListener("click", clearCells);
  resize.addEventListener("click", resizeGrid);
  basic.addEventListener("click", () => {
    clearCells();
    colorMode = "normal";
  });
  random.addEventListener("click", () => {
    clearCells();
    colorMode = "random";
  });
  real.addEventListener("click", () => {
    clearCells();
    cells.forEach(cell => (cell.style.opacity = 0));
    colorMode = "real";
  });

  colors.forEach(color => color.addEventListener("click", setColor));
}
