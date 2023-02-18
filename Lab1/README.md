# Lab1: CodeWars katas
## Students
- Kovalenko Mykita IP-01
- Smyslov Danil IP-01
- Hernuf Valid IP-01

## Find matching parenthesis
Implement String prototype method findParenMatch, taking an index pointing into the string as an argument:
```
String.prototype.findParenMatch = function(pos) {} ;
```
Based on the given index, return the index of the matching parenthesis in the given string; or -1, Nothing or a similar empty value, if there is no such index.<br/>
https://www.codewars.com/kata/59293c2cfafd38975600002d

## Count characters in your string
The main idea is to count all the occurring characters in a string. If you have a string like aba, then the result should be `{'a': 2, 'b': 1}`.<br/>
https://www.codewars.com/kata/52efefcbcdf57161d4000091

## The Hashtag Generator
The marketing team is spending way too much time typing in hashtags.
Let's help them with our own Hashtag Generator!

### Examples
```
" Hello there thanks for trying my Kata"  =>  "#HelloThereThanksForTryingMyKata"
"    Hello     World   "                  =>  "#HelloWorld"
""                                        =>  false
```
https://www.codewars.com/kata/52449b062fb80683ec000024

## Find The Parity Outlier
You are given an array (which will have a length of at least 3, but could be very large) containing integers. The array is either entirely comprised of odd integers or entirely comprised of even integers except for a single integer N. Write a method that takes the array as an argument and returns this "outlier" N.

### Examples
```
[2, 4, 0, 100, 4, 11, 2602, 36]
Should return: 11 (the only odd number)

[160, 3, 1719, 19, 11, 13, -21]
Should return: 160 (the only even number)
```
https://www.codewars.com/kata/5526fc09a1bbd946250002dc

## Does my number look big in this?
Your code must return true or false (not 'true' and 'false') depending upon whether the given number is a Narcissistic number in base 10. This may be True and False in your language, e.g. PHP.<br/>
https://www.codewars.com/kata/5287e858c6b5a9678200083c

## Detect Pangram
Given a string, detect whether or not it is a pangram. Return True if it is, False if not. Ignore numbers and punctuation. A pangram is a sentence that contains every single letter of the alphabet at least once.
### Example
```
"The quick brown fox jumps over the lazy dog" => true
"Hello world" => false
```
https://www.codewars.com/kata/545cedaa9943f7fe7b000048

## Your order, please
Your task is to sort a given string. Each word in the string will contain a single number. This number is the position the word should have in the result. If the input string is empty, return an empty string. The words in the input String will only contain valid consecutive numbers.

### Examples
```
"is2 Thi1s T4est 3a"  -->  "Thi1s is2 3a T4est"
"4of Fo1r pe6ople g3ood th5e the2"  -->  "Fo1r the2 g3ood 4of th5e pe6ople"
""  -->  ""
```
https://www.codewars.com/kata/55c45be3b2079eccff00010f

## Unique In Order
Implement the function unique_in_order which takes as argument a sequence and returns a list of items without any elements with the same value next to each other and preserving the original order of elements.
### Examples
```
unique_in_order('AAAABBBCCDAABBB') == ['A', 'B', 'C', 'D', 'A', 'B']
unique_in_order('ABBCcAD')         == ['A', 'B', 'C', 'c', 'A', 'D']
unique_in_order([1, 2, 2, 3, 3])   == [1, 2, 3]
unique_in_order((1, 2, 2, 3, 3))   == [1, 2, 3]
```
https://www.codewars.com/kata/54e6533c92449cc251001667

## Answers to the control questions
1. На сервері немає доступу до DOM елементів. А Node.js є певні модулі, яких немає в браузері. До прикладу, модулі для роботи з файловою системою. В Node.js також є можливість контролю версій Node.js, а версію браузера користувача неможливо контролювати
2. Основні типи в JS: 
    - number
    - string
    - boolean
    - undefined
    - null
    - bigint
    - symbol
    - object
3. Локальні змінні, що оголошені в функції, недоступні ззовні функції. Завдяки цьому, за допомогою механізму замикання, можна зробити локальну змінну функції, так би мовити, приватною. Потрібно повертати з функції, в якій оголошена змінна, ще одну функцію. Тоді при подальших викликах, крім першого, ми будемо виконувати саме вкладену функцію, а вона якраз матиме доступ до локальної змінної, що оголошена в її батьківській функції.
4. Основні стандартні бібліотеки Node.js: 
    - http - створення Node.js http сервера
    - url - робота з URL(парсинг...)
    - querystring - робота з querystring
    - path - робота з шляхами файлів
    - fs - робота з I/O файлів
    - util - корисий функціонал для розробників
5. Способи імпортувати модулі в Node.js:
    - require("module-name")
    - import
6. V8 - це двигун Google Chrome, що дозволяє виконувати JavaScript як в браузері, так і поза браузером, тобто Node.js.
7. Використовуючи ключове слово exports.