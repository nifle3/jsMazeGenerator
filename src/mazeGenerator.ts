import type { MazeField, GeneratorFunc } from "./maze.ts";

export const generators: Record<string, GeneratorFunc> = {
  "simple": SimpleGenerator,
};

function SimpleGenerator(): MazeField {

  return [[]];
}
