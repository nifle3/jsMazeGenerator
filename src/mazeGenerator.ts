import { type MazeField, type GeneratorFunc, createMazeField, PossibleWay } from "./maze.ts";
import { getRandomNumber, getRandomNumberWithMin } from "./utils.ts";

export const generators: Record<string, GeneratorFunc> = {
  "Sidewinder": sidewinder,
  "Binary tree": binaryTreeAlgorithm,
};

function binaryTreeAlgorithm(row: number, col: number): MazeField {
  console.debug("Binary tree algorithm start");
  const field = createMazeField(row, col);

  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      let possibleWay: PossibleWay[] = [];

      if (i-1 >= 0) {
        possibleWay.push(PossibleWay.TOP);
      }

      if (j+1 < field[i].length) {
        possibleWay.push(PossibleWay.RIGHT)
      }

      if (possibleWay.length == 0) {
        continue;
      }

      const wayToDestroyWall = possibleWay[getRandomNumber(possibleWay.length)];
      field[i][j] = wayToDestroyWall;
    }
  }

  console.debug("Field", field);

  return field;
}

function sidewinder(row: number, col: number): MazeField {
  const field = createMazeField(row, col);

  for (let i = 0; i < field[0].length; i++) {
    field[0][i] = PossibleWay.RIGHT;
  }

  for (let i = 1; i < field.length; i++) {
    for (
      let j = 0, indexEndOfSet = getRandomNumberWithMin(j, field[i].length);
      j < field[i].length;
      j += indexEndOfSet, indexEndOfSet = getRandomNumberWithMin(j, field[i].length)
    ) {

      for (let k = j; k < indexEndOfSet; k++) {
        field[i][k] = PossibleWay.RIGHT;
      }

      const indexCellWithWayToTop = getRandomNumberWithMin(j, indexEndOfSet);
      if (field[i][indexCellWithWayToTop] == PossibleWay.RIGHT) {
        field[i][indexCellWithWayToTop] = PossibleWay.RIGHT_AND_TOP;
      } else {
        field[i][indexCellWithWayToTop] = PossibleWay.TOP;
      }
    }
  }

  return field;
}
