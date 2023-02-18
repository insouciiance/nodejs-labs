function findOutlier(ints){
  const isEvenArray = ((ints[0] & 1) + (ints[1] & 1) + (ints[2] & 1)) <= 1;
  return ints.find(i => (i & 1) == isEvenArray ? 1 : 0);
}
