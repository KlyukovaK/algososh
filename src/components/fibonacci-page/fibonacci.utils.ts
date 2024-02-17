export const getFibonacci = async (n: number) => {
  const arr: number[] = [0, 1];
  for (let i = 2; i < n + 2; i++) {
    arr[i] = arr[i - 2] + arr[i - 1];
  }
  return arr.slice(1, n + 2);
};
