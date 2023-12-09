export const factorial = (num: number) => {
  let value= 1;
  for (let i = 2; i <= num; i++) {
    value = value * i;
  }
  return value;
};
