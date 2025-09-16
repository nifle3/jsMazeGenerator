export function getRandomNumber(max: number): number {
  return Math.floor(Math.random() * max);
}

export function getRandomNumberWithMin(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
