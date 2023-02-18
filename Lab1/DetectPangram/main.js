function isPangram(inputStr) {
  strCharCodes = inputStr.split("").map(char => char.toLowerCase().charCodeAt(0));
  filteredCodes = strCharCodes.filter(code => code >= 97 && code <= 122);
  const uniqueCodes = Array.from(new Set(filteredCodes));
  uniqueCodesLength = uniqueCodes.length;
  console.log(uniqueCodesLength)
  if (uniqueCodesLength == 26) return true;
  return false;
}

console.log(isPangram('The quick brown fox jumps over the lazy dog'));