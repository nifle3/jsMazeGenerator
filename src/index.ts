function getObjectBySelector(selector: string): HTMLElement {
    const element: HTMLElement | undefined = document.querySelector(selector);
    if (!element) {
        throw new Error("Element with selector is not defined");
    }
    
    console.debug("Element by selector ", selector, element);
    
    return element;
}

function onClickGenerateButton(event): void {
    console.debug("click on generate button");

    return;
}

const rowCountInput = getObjectBySelector("#rowcount");
const colCountInput = getObjectBySelector("#colcount");
const generateButton = getObjectBySelector("#generate-button");
const mazeCanvas = getObjectBySelector("#canvas-maze");

generateButton.addEventListener("click", onClickGenerateButton);
