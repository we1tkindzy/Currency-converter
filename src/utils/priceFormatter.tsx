export default (price: string): string | number => {
  const priceNumber = Number(price);
  if (price.length === 0 || isNaN(priceNumber)) {
    return "";
  }

  const partsOfNumber = priceNumber.toString().split(".");

  if (partsOfNumber[1]) {
    let numberBeforeDot = "";
    let numberAfterDot = "";
    for (let i = 0; i < partsOfNumber[1].length; i++) {
      if (partsOfNumber[1][i] === "0" && partsOfNumber[1][i - 1] === "0") {
        numberBeforeDot += partsOfNumber[1][i];
      } else {
        numberAfterDot += partsOfNumber[1][i];
      }
    }

    return Number(
      partsOfNumber[0] + "." + numberBeforeDot + numberAfterDot.slice(0, 6)
    );
  }

  return priceNumber;
};
