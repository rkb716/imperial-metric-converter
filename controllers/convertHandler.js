function ConvertHandler() {

  /*
  splits the input string, returning the number
  or "invalid number" if the number is not valid
  */
  this.getNum = function(input) {
    let regexResult = this.regexUnit(input);
    let lastIndex;
    if(regexResult != null) {
      lastIndex = regexResult.index;
    } else {
      lastIndex = input.length;
    }
    if(lastIndex < 1) {
      return 1;
    }
    let slicedNum = input.slice(0, lastIndex);
    let splitNum = slicedNum.split('/');
    if(splitNum.length > 2) {
      return "invalid number";
    }
    if (splitNum.length == 2) {
      let num1, num2;
      if(!this.checkDecimalsValid(splitNum[0]) || !this.checkDecimalsValid(splitNum[1])) {
        return "invalid number";
      }
      num1 = parseFloat(splitNum[0]);
      num2 = parseFloat(splitNum[1]);
      if(isNaN(num1) || isNaN(num2)) {
        return "invalid number";
      }
      return num1 / num2;
    }
    if(!this.checkDecimalsValid(slicedNum)) {
      return "invalid number";
    }
    let num = parseFloat(slicedNum);
    if(isNaN(num)) {
      return "invalid number";
    }
    num = Number(num.toFixed(5));
    return num;
  };

  /*
  parses the input string, returning the measurement unit
  if it is in: ['gal', 'L', 'lbs', 'kg', 'mi', 'km'] or
  'invalid unit' if it is not.
  */
  this.getUnit = function(input) {
    let regexResult = this.regexUnit(input);
    if(regexResult == null) {
      return "invalid unit";
    } else {
      return regexResult[0].toLowerCase();
    }
  };

  /*
  takes a valid measurement unit and returns it's conversion opposite:
  gal <-> L
  lbs <-> kg
  mi <-> km
  */
  this.getReturnUnit = function(initUnit) {
    initUnit = initUnit.toLowerCase();
    switch(initUnit) {
      case "gal":
        return "l";
      case "lbs":
        return "kg";
      case "mi":
        return "km";
      case "l":
        return "gal";
      case "kg":
        return "lbs";
      case "km":
        return "mi";
      default:
        return "invalid unit";
    }
  };

  this.spellOutUnit = function(unit) {
    unit = unit.toLowerCase();
    switch(unit) {
      case "gal":
        return "gallons";
      case "lbs":
        return "pounds";
      case "mi":
        return "miles";
      case "l":
        return "liters";
      case "kg":
        return "kilograms";
      case "km":
        return "kilometers";
      default:
        return "invalid unit";
    }
  };

  /*
    Converts the parsed number and unit between imperial and metric.
  */
  this.convert = function(initNum, initUnit) {
    if(initNum == "invalid number") {
      if(initUnit == "invalid unit") {
        return "invalid number and unit";
      }
      return "invalid number";
    } else if(initUnit == "invalid unit") {
      return "invalid unit";
    }
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    initUnit = initUnit.toLowerCase();
    let num;
    switch(initUnit) {
      case "gal":
        num = initNum * galToL;
        break;
      case "lbs":
        num = initNum * lbsToKg;
        break;
      case "mi":
        num = initNum * miToKm;
        break;
      case "l":
        num = initNum / galToL;
        break;
      case "kg":
        num = initNum / lbsToKg;
        break;
      case "km":
        num = initNum / miToKm;
        break;
      default:
        return "invalid unit";
    }
    num = Number(num.toFixed(5));
    return num;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    if(returnNum == "invalid number") {
      if(returnUnit == "invalid unit") {
        return "invalid number and unit";
      }
      return "invalid number";
    }
    if(returnUnit == "invalid unit") {
      return "invalid unit";
    }
    return initNum + " " + this.spellOutUnit(initUnit) + " converts to " + returnNum + " " + this.spellOutUnit(returnUnit);
  };

  this.regexUnit = function(input) {
    let unitRegExp = /[A-z]+$/;
    return input.match(unitRegExp);
  }

  this.checkDecimalsValid = function(str) {
    let decimalCount = 0;
    for(let i = 0; i < str.length; i++) {
      if(str[i] == '.') {
        decimalCount++;
      }
    }
    return decimalCount < 2;
  }
}

module.exports = ConvertHandler;