function order(str) {
    words = str.split(' ');
    words.sort(function compare(a, b) {
        if(getNumber(a) < getNumber(b))return -1;
    });
    return words.join(' ');
}

function getNumber(str) {
    for (let i = 0; i < str.length; i++) {
        charCode = str[i].charCodeAt();
        if (charCode >= 49 && charCode <= 57) return Number(str[i]);
    }
}

console.log(order('4of Fo1r pe6ople g3ood th5e the2'));