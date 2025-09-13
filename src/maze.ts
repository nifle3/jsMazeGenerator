export enum PossibleWay {
  NONE, RIGHT, TOP
}

export type MazeField = PossibleWay[][];
export type GeneratorFunc = (rowCount: number, colCount: number) => MazeField;

export function createMazeField(row: number, col: number): MazeField {
  return Array.from({ length: row }, () =>
    Array.from({ length: col }, (): PossibleWay => PossibleWay.NONE)
  );
}
