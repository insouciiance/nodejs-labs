const uniqueInOrder=function(iterable){
  if(typeof iterable === 'string'){
      iterable = iterable.split('');
  }
  const answer = [];
  iterable.forEach(element => {
      if(answer[answer.length-1] !== element) {
          answer.push(element);
      }
  });
  return answer;
}

console.log(uniqueInOrder([1,2,2,3,3]));