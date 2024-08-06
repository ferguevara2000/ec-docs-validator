function validateModule10(ci) {
  var coefficients = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  var nineDigitsArray = ci.substring(0, 9).split("").map(Number);

  var sum = coefficients.reduce(function (acc, coef, index) {
    var product = coef * nineDigitsArray[index];
    if (product >= 10) product -= 9;
    return acc + product;
  }, 0);

  return sum % 10 === 0 ? 0 : 10 - (sum % 10);
}

function validateModule11(ruc, coefficients) {
  var digitsArray = ruc.substring(0, coefficients.length).split("").map(Number);
  var sum = coefficients.reduce(function (acc, coef, index) {
    return acc + coef * digitsArray[index];
  }, 0);
  var residue = sum % 11;
  return residue === 0 ? 0 : 11 - residue;
}

function validateModule11Digit9(ruc) {
  return validateModule11(ruc, [4, 3, 2, 7, 6, 5, 4, 3, 2]);
}

function validateModule11Digit6(ruc) {
  return validateModule11(ruc, [3, 2, 7, 6, 5, 4, 3, 2]);
}

var PLATE_CODES = [
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

function validateCarPlate(plate) {
  plate = plate.replace("-", "");

  if (plate.length !== 7) return false;

  var letters = plate.slice(0, 3);
  var numbers = plate.slice(3);

  var isLettersValid =
    /^[A-Z]{3}$/.test(letters) && PLATE_CODES.includes(letters[0]);
  var isNumbersValid = /^[0-9]{4}$/.test(numbers);

  return isLettersValid && isNumbersValid;
}

function validateMotorcyclePlate(plate) {
  plate = plate.replace("-", "");

  if (plate.length !== 6) return false;

  var startLetters = plate.slice(0, 2);
  var middleNumbers = plate.slice(2, 5);
  var endLetter = plate.slice(5);

  var isStartLettersValid =
    /^[A-Z]{2}$/.test(startLetters) && PLATE_CODES.includes(startLetters[0]);
  var isMiddleNumbersValid = /^[0-9]{3}$/.test(middleNumbers);
  var isEndLetterValid = /^[A-Z]$/.test(endLetter);

  return isStartLettersValid && isMiddleNumbersValid && isEndLetterValid;
}

function isNumber(str) {
  if (typeof str !== "string") return false;
  return /^\d+$/.test(str);
}

export function ci(ci) {
  if (typeof ci === "number") ci = ci.toString();
  if (ci.length !== 10) return false;

  const firstTwoDigits = parseInt(ci.substring(0, 2), 10);
  if ((firstTwoDigits < 1 || firstTwoDigits > 24) && firstTwoDigits !== 30)
    return false;
  if (parseInt(ci.charAt(2), 10) >= 6) return false;

  return parseInt(ci.charAt(9), 10) === validateModule10(ci);
}

export function ruc(ruc) {
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
}

export function cellphone(cellphone) {
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
}

export function telephone(telephone) {
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
}

export function plates(plate) {
  if (plate.length === 7) return validateCarPlate(plate);

  if (plate.length === 6) return validateMotorcyclePlate(plate);

  return false;
}

export function zipCode(zipCode) {
  if (typeof zipCode === "number") zipCode = zipCode.toString();

  if (!isNumber(zipCode)) return false;

  if (zipCode.length !== 6) return false;

  var startNumbers = parseInt(zipCode.slice(0, 2), 10);
  if (startNumbers >= 1 && startNumbers <= 24) return true;

  return false;
}

const validator = {
  ci,
  ruc,
  cellphone,
  telephone,
  plates,
  zipCode,
};

export default validator;
