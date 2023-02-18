function narcissistic(value) {
  let sum = 0;
  const str = String(value)
  numbers = str.split('').map(el => sum += Math.pow(Number(el),str.length))
  return sum == value
}

console.log(narcissistic(153))