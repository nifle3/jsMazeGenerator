export type MazeField = boolean[][];
export type GeneratorFunc = (rowCount: number, colCount: number) => MazeField;
