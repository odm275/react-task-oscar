export function createArrRange(start, stop, step) {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step
  );
}

export function createBarLabels(from, step, maxLimit) {
  // If we're already at the limit, we're not interested.
  if (from === maxLimit) {
    return null;
  }
  // If we are close to the limit, and we have some left over range
  // Lump it in the last bit of range.
  let to = from + step;
  if (to > maxLimit) {
    const saveSubRange = maxLimit - from;
    to = from + saveSubRange;
  }
  // Labels at boundaries
  const lowerBoundaryLabel = '[';
  const upperBoundary = to >= maxLimit ? ']' : ')';

  return `${lowerBoundaryLabel}${from}, ${to}${upperBoundary}`;
}

// Generates function that will check a specific range
// Keeps an accumulator of values that match the range

export function fnRangeTest(from, step, maxLimit) {
  if (from === maxLimit) {
    return null;
  }
  let to = from + step;
  if (to > maxLimit) {
    const saveSubRange = maxLimit - from;
    to = from + saveSubRange;
  }
  return function(arr) {
    const bucket = arr.filter(function(num) {
      const lowerBoundary = num >= from;
      const upperBoundary = to >= maxLimit ? num <= to : num < to;
      return lowerBoundary && upperBoundary;
    });
    return {
      acc: bucket,
      fnRangeTest: fnRangeTest
    };
  };
}
