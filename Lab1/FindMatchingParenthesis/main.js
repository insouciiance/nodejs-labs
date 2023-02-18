String.prototype.findParenMatch = function (pos) {
  let parenDiff = 0;
  let result = -1;
  const reverse = this[pos] === ")";

  const checkChar = (i) => {
    if (this[i] === "(")
      parenDiff += 1;

    if (this[i] === ")")
      parenDiff -= 1;

    if (parenDiff === 0) {
      result = i;
      return true;
    }

    if ((!reverse && parenDiff < 0) || (reverse && parenDiff > 0))
      return false;
  }

  for (let i = pos; i >= 0 && i < this.length; i += reverse ? -1 : 1) {
    if (checkChar(i))
      return result;
  }

  return -1;
};

console.log(")((()))(".findParenMatch(4));
