function count(string) {  
  const chars = string.split("").reduce((acc, c) => {
    acc[c] = (acc[c] ?? 0) + 1;
    return acc;
  }, {});

  return chars;
}

console.log(count("aafgjshgslkfjhgaiuhtralkrhk"));
