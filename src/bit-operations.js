export function checkBit(number, bitToCheck) {
  var mask = (1 << bitToCheck) >>> 0;
  var result = (number & mask) >>> 0;
  return result !== 0;
}

export function slice(number, start, end) {
  var mask = Math.pow(2, end - start + 1) - 1;
  mask = mask << start;
  var result = number & mask;
  return result >> start;
}

export function flipBit(number, bitToFlip) {
  if (checkBit(number, bitToFlip)) {
    // bit is on
    var mask = 1 << bitToFlip;
    // invert mask then and
    mask = ~mask;
    return (number & mask) >>> 0;
  }

  // bit is off
  var mask = 1 << bitToFlip;
  return (number | mask) >>> 0;
}
