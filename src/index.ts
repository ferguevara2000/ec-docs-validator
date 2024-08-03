exports.ci = (ci) => {
  if (typeof ci === "number") ci = ci.toString();
  if (ci.length !== 10) return false;

  const firstTwoDigits = parseInt(ci.substring(0, 2), 10);
  if ((firstTwoDigits < 1 || firstTwoDigits > 24) && firstTwoDigits !== 30)
    return false;
  if (parseInt(ci.charAt(2), 10) >= 6) return false;

  return parseInt(ci.charAt(9), 10) === validateModule10(ci);
};

exports.ruc = (ruc) => {
  if (typeof ruc === "number") ruc = ruc.toString();
  if (ruc.length !== 13) return false;

  const lastDigits = ruc.substring(10, 13);
  if (lastDigits === "000") return false;

  const thirdDigit = ruc[2];
  let validator = parseInt(ruc.charAt(9), 10);

  if (thirdDigit === "6") {
    validator = parseInt(ruc.charAt(8), 10);
    return validator === validateModule11Digit6(ruc);
  } else if (thirdDigit === "9") {
    return validator === validateModule11Digit9(ruc);
  } else {
    return validator === validateModule10(ruc.substring(0, 10));
  }
};

exports.cellphone = (cellphone) => {
  if (typeof cellphone === "number") cellphone = cellphone.toString();

  if (cellphone[0] === "+") cellphone = cellphone.slice(1);

  if (!isNumber(cellphone)) return false;

  if (cellphone[0] === "9") cellphone = "0" + cellphone;

  if (cellphone[3] === "0") {
    cellphone = cellphone.substring(0, 3) + cellphone.substring(4);
  }

  if (cellphone.length === 10) return cellphone.substring(0, 2) === "09";

  if (cellphone.length === 12) return cellphone.substring(0, 4) === "5939";

  return false;
};

exports.telephone = (telephone) => {
  if (typeof telephone === "number") telephone = telephone.toString();

  if (!isNumber(telephone)) return false;

  if (telephone[0] === "0") telephone = telephone.slice(1);

  const length = telephone.length;
  if (length === 8) {
    const [firstDigit, secondDigit] = telephone
      .slice(0, 2)
      .split("")
      .map(Number);
    return (
      firstDigit >= 2 &&
      firstDigit <= 7 &&
      (secondDigit === 2 || secondDigit === 3)
    );
  }

  if (length === 7) {
    const firstDigit = parseInt(telephone[0], 10);
    return firstDigit === 2 || firstDigit === 3;
  }

  return false;
};

exports.plates = (plate) => {
  if (plate.length === 7) return validateCarPlate(plate);

  if (plate.length === 6) return validateMotorcyclePlate(plate);

  return false;
};

exports.zipCode = (zipCode) => {
  if (typeof zipCode === "number") zipCode = zipCode.toString();

  if (!isNumber(zipCode)) return false;

  if (zipCode.length !== 6) return false;

  const startNumbers = parseInt(zipCode.slice(0, 2), 10);
  if (startNumbers >= 1 && startNumbers <= 24) return true;

  return false;
};

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
  const digitsArray = ruc
    .substring(0, coefficients.length)
    .split("")
    .map(Number);
  const sum = coefficients.reduce(
    (acc, coef, index) => acc + coef * digitsArray[index],
    0
  );
  const residue = sum % 11;
  return residue === 0 ? 0 : 11 - residue;
};

const validateModule11Digit9 = (ruc) =>
  validateModule11(ruc, [4, 3, 2, 7, 6, 5, 4, 3, 2]);

const validateModule11Digit6 = (ruc) =>
  validateModule11(ruc, [3, 2, 7, 6, 5, 4, 3, 2]);

const PLATE_CODES = [
  "A",
  "B",
  "C",
  "E",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const validateCarPlate = (plate) => {
  plate = plate.replace("-", "");

  if (plate.length !== 7) return false;

  const letters = plate.slice(0, 3);
  const numbers = plate.slice(3);

  const isLettersValid =
    /^[A-Z]{3}$/.test(letters) && PLATE_CODES.indexOf(letters[0]) !== -1;
  const isNumbersValid = /^[0-9]{4}$/.test(numbers);

  return isLettersValid && isNumbersValid;
};

const validateMotorcyclePlate = (plate) => {
  plate = plate.replace("-", "");

  if (plate.length !== 6) return false;

  const startLetters = plate.slice(0, 2);
  const middleNumbers = plate.slice(2, 5);
  const endLetter = plate.slice(5);

  const isStartLettersValid =
    /^[A-Z]{2}$/.test(startLetters) &&
    PLATE_CODES.indexOf(startLetters[0]) !== -1;
  const isMiddleNumbersValid = /^[0-9]{3}$/.test(middleNumbers);
  const isEndLetterValid = /^[A-Z]$/.test(endLetter);

  return isStartLettersValid && isMiddleNumbersValid && isEndLetterValid;
};

const isNumber = (str) => {
  if (typeof str !== "string") return false;
  return /^\d+$/.test(str);
};
