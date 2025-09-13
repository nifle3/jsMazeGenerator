import { MazeField, PossibleWay } from "./maze.ts";
import { generators } from "./mazeGenerator.ts";

function getObjectBySelector<T extends HTMLElement>(selector: string): T {
  const element: T | null = document.querySelector(selector);
  if (!element) {
    throw new Error("Element with selector is not defined");
  }

  console.debug("Element by selector ", selector, element);

  return element as T;
}

function onClickGenerateButton(event): void {
  console.debug("click on generate button");

  const rowCount = rowCountInput.value as unknown as number;
  const colCount = colCountInput.value as unknown as number;
  const selectOption = algoSelect.value;

  if (rowCount < 3 || rowCount > 20 || colCount < 3 || colCount > 20) {
    throw new Error("Min value of row count and col count is 3. Max value is 20");
  }

  console.debug("rowCount, colCount algoName", rowCount, colCount, selectOption);

  const generator = generators[selectOption];
  if (!generator) {
    throw new Error("Invlaid generator name");
  }

  printOnCanvas(
    generator(rowCount, colCount),
    colCount, rowCount
  );

  return;
}

function printOnCanvas(field: MazeField, col: number, row: number): void {
  console.debug("Start paint");

  const width = (widthPerCol * col);
  const height = (heightPerRow * row);
  mazeCanvas.width = width;
  mazeCanvas.height = height;

  console.debug("set canvas shape width: ", width, "height", height);

  drawStart();
  drawEnd(col, row);

  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      const xStartCell = j * widthPerCol;
      const yStartCell = i * heightPerRow;

      const rightUpperAngleX = xStartCell + widthPerCol;
      const rightUpperAngleY = yStartCell;
      const rightDownAngleX = xStartCell + widthPerCol;
      const rightDownAngleY = yStartCell + heightPerRow;

      if (j+1 < field[i].length && field[i][j+1] != PossibleWay.TOP) {
        drawLine(xStartCell, yStartCell, rightUpperAngleX, rightUpperAngleY);
      }

      if (i - 1 > 0 && field[i-1][j] != PossibleWay.RIGHT) {
        drawLine(rightUpperAngleX, rightUpperAngleY, rightDownAngleX, rightDownAngleY);
      }
    }
  }

    console.debug("Stop paint");
}

function drawStart(): void {
  const x = widthPerCol / 2;
  const y = heightPerRow / 2;
  const radius = calcualteRadiusOfCircleInCell();

  drawCircle("rgb(0, 255, 0)", x, y, radius);
}

function drawEnd(colCount: number, rowCount: number) {
  const x = ((colCount - 1) * widthPerCol) + (widthPerCol / 2);
  const y = ((rowCount - 1) * heightPerRow) + (heightPerRow / 2);
  const radius = calcualteRadiusOfCircleInCell();

  drawCircle("rgb(255, 0, 0)", x, y, radius);
}

function calcualteRadiusOfCircleInCell(): number {
  return Math.min(widthPerCol / 2, heightPerRow / 2)
}

function drawCircle(color: string, xCenter: number, yCenter: number, radius: number) {
  const previousColor = context!.fillStyle;
  context!.fillStyle = color;
  console.debug("(xCenter, yCenter, radius)", xCenter, yCenter, radius);

  context!.beginPath();

  context!.arc(xCenter, yCenter, radius, 0, Math.PI * 2, true);

  context!.fill();
  context!.closePath();
}

function drawLine(xFrom: number, yFrom: number, xTo: number, yTo: number): void {
  console.debug(`from (${xFrom}, ${yFrom}), to (${xTo}, ${yTo})`)

  context!.beginPath();

  context!.moveTo(xFrom, yFrom);
  context!.lineTo(xTo, yTo);
  context!.stroke();

  context!.closePath();
}

const heightPerRow = 50;
const widthPerCol = 50;

const rowCountInput = getObjectBySelector<HTMLInputElement>("#rowcount");
const colCountInput = getObjectBySelector<HTMLInputElement>("#colcount");
const algoSelect = getObjectBySelector<HTMLSelectElement>("#algo-select");
const generateButton = getObjectBySelector<HTMLButtonElement>("#generate-button");
const mazeCanvas = getObjectBySelector<HTMLCanvasElement>("#canvas-maze");
const context = mazeCanvas.getContext("2d");
if (!context) {
    throw new Error("Context is not defined")
}

for (const algoName of Object.keys(generators)) {
  const option = new Option(algoName, algoName);
  algoSelect.add(option);
}

generateButton.addEventListener("click", onClickGenerateButton);
