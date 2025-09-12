import { MazeField } from "./maze.ts";
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

  console.debug("rowCount, colCount algoName", rowCount, colCount, selectOption);

  const generataor = generators[selectOption];
  if (!generataor) {
    throw new Error("Invlaid generator name");
  }

  printOnCanvas(
    saveField(
      generataor(rowCount, colCount)
    )
  );

  return;
}

function saveField(mazeField: MazeField): MazeField {
  field = mazeField;
  return mazeField;
}

function printOnCanvas(field: MazeField): void {

}

let field: MazeField | undefined = undefined;
const rowCountInput = getObjectBySelector<HTMLInputElement>("#rowcount");
const colCountInput = getObjectBySelector<HTMLInputElement>("#colcount");
const algoSelect = getObjectBySelector<HTMLSelectElement>("#algo-select");
const generateButton = getObjectBySelector<HTMLButtonElement>("#generate-button");
const importButton = getObjectBySelector<HTMLButtonElement>("#import-button");
const exportButton = getObjectBySelector<HTMLButtonElement>("#export-button");
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
