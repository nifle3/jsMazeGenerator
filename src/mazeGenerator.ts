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
    let set: number[] = [];

    for (let j = 0; j < field[i].length; j++) {
      set.push(j);
      if (sidewinderIsSetEnd()) {
        const indexInSetToGetTopWay = getRandomNumber(set.length - 1);
        const indexToGetTopWay = set[indexInSetToGetTopWay];

        if (field[i][indexToGetTopWay] == PossibleWay.RIGHT) {
          field[i][indexToGetTopWay] = PossibleWay.RIGHT_AND_TOP;
        } else {
          field[i][indexToGetTopWay] = PossibleWay.TOP;
        }

        set = [];
      } else {
        field[i][j] = PossibleWay.RIGHT;
      }
    }
  }

  return field;
}

function sidewinderIsSetEnd(): boolean {
  return (getRandomNumber(100) % 2) == 0;
}
