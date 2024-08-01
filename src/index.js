const validateModule10 = (ci) => {
  const coefficients = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  const nineDigitsArray = ci.substring(0, 9).split("").map(Number);

  const sum = coefficients.reduce((acc, coef, index) => {
    let product = coef * nineDigitsArray[index];
    if (product >= 10) product -= 9;
    return acc + product;
  }, 0);

  return sum % 10 === 0 ? 0 : 10 - (sum % 10);
};

const validateModule11 = (ruc, coefficients) => {
  const digitsArray = ruc.substring(0, coefficients.length).split("").map(Number);
  const sum = coefficients.reduce((acc, coef, index) => acc + coef * digitsArray[index], 0);
  const residue = sum % 11;
  return residue === 0 ? 0 : 11 - residue;
};

const validateModule11Digit9 = (ruc) => validateModule11(ruc, [4, 3, 2, 7, 6, 5, 4, 3, 2]);
const validateModule11Digit6 = (ruc) => validateModule11(ruc, [3, 2, 7, 6, 5, 4, 3, 2]);

exports.ci = (ci) => {
  if (typeof ci === 'number') ci = ci.toString();
  if (ci.length !== 10) return false;

  const firstTwoDigits = parseInt(ci.substring(0, 2), 10);
  if (firstTwoDigits <= 0 || firstTwoDigits > 24) return false;
  if (parseInt(ci.charAt(2), 10) >= 6) return false;

  return parseInt(ci.charAt(9), 10) === validateModule10(ci);
};

exports.ruc = (ruc) => {
  if (typeof ruc === 'number') ruc = ruc.toString();
  if (ruc.length !== 13) return false;

  const lastDigits = ruc.substring(10, 13);
  if (lastDigits === "000") return false;

  const thirdDigit = ruc[2];
  let validator = parseInt(ruc.charAt(9), 10);

  if (thirdDigit === '6') {
    validator = parseInt(ruc.charAt(8), 10);
    return validator === validateModule11Digit6(ruc);
  } else if (thirdDigit === '9') {
    return validator === validateModule11Digit9(ruc);
  } else {
    return validator === validateModule10(ruc.substring(0, 10));
  }
};

