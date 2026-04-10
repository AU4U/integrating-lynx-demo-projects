export const nearestMultiple = (org: number, step: number) => {
  return Math.round(org / step) * step;
};
