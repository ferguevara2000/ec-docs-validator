var assert = require("assert");
const validator = require("../src/index.js");

describe("Validate CI", function () {
  it("Invalid CI", function () {
    assert.equal(validator.ci(1), false);
    assert.equal(validator.ci("1"), false);
    assert.equal(validator.ci("abcedfcdsd"), false);
    assert.equal(validator.ci(-1709382786), false);
    assert.equal(validator.ci("4009E82786"), false);
    assert.equal(validator.ci(1000000000), false);
    assert.equal(validator.ci(1804e84731), false);
  });

  it("Valid CI", function () {
    assert.equal(validator.ci("3040017919"), true);
    assert.equal(validator.ci("0910985993"), true);
    assert.equal(validator.ci(1710034065), true);
  });
});

describe("Validate RUC", function () {
  it("Invalid RUC", function () {
    assert.equal(validator.ruc(1), false);
    assert.equal(validator.ruc(1708408725), false);
    assert.equal(validator.ruc(1708408725000), false);
  });

  it("Valid RUC", function () {
    assert.equal(validator.ruc(1804384731001), true);
    assert.equal(validator.ruc("0990049459001"), true);
    assert.equal(validator.ruc(1860001450001), true);
  });
});

describe("Validate Cellphone", function () {
  it("Invalid Cellphone", function () {
    assert.equal(validator.cellphone("098478467"), false);
    assert.equal(validator.cellphone("0984E8467"), false);
    assert.equal(validator.cellphone("0884784667"), false);
    assert.equal(validator.cellphone("593084784667"), false);
  });

  it("Valid Cellphone", function () {
    assert.equal(validator.cellphone("0983484667"), true);
    assert.equal(validator.cellphone("593984784667"), true);
    assert.equal(validator.cellphone("+593984784667"), true);
  });
});

describe("Validate Telephone", function () {
  it("Invalid Telephone", function () {
    assert.equal(validator.telephone("28947980"), false);
    assert.equal(validator.telephone("98947980"), false);
    assert.equal(validator.telephone("2I947980"), false);
    assert.equal(validator.telephone("082895741"), false);
    assert.equal(validator.telephone("032456E65"), false);
    assert.equal(validator.telephone("28289"), false);
  });

  it("Valid Telephone", function () {
    assert.equal(validator.telephone("2895741"), true);
    assert.equal(validator.telephone("02947980"), true);
    assert.equal(validator.telephone("022895741"), true);
    assert.equal(validator.telephone("032895741"), true);
  });
});

describe("Validate Plate Car or Motorcycle", function () {
  it("Invalid Plate", function () {
    assert.equal(validator.plates("PBA038"), false);
    assert.equal(validator.plates("ABC938"), false);
    assert.equal(validator.plates("DAB0389"), false);
    assert.equal(validator.plates("PBA038"), false);
    assert.equal(validator.plates("ABC938"), false);
    assert.equal(validator.plates("DA039E"), false);
    assert.equal(validator.plates("AA0394"), false);
    assert.equal(validator.plates("LA0394"), false);
    assert.equal(validator.plates("A20394"), false);
    assert.equal(validator.plates("A2039E"), false);
  });

  it("Valid Plate", function () {
    assert.equal(validator.plates("PBA0389"), true);
    assert.equal(validator.plates("LBA3987"), true);
    assert.equal(validator.plates("ABC1234"), true);
    assert.equal(validator.plates("AA049E"), true);
    assert.equal(validator.plates("LA049E"), true);
    assert.equal(validator.plates("PA049E"), true);
  });
});

describe("Validate ZipCode", function () {
  it("Invalid ZipCOde", function () {
    assert.equal(validator.zipCode("12E456"), false);
    assert.equal(validator.zipCode("251456"), false);
    assert.equal(validator.zipCode("21456"), false);
  });

  it("Valid ZipCode", function () {
    assert.equal(validator.zipCode("128456"), true);
    assert.equal(validator.zipCode("045678"), true);
  });
});
