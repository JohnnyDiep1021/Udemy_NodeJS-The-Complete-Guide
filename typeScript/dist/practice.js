"use strict";
const num1Ele = document.getElementById(`num1`);
const num2Ele = document.getElementById(`num2`);
// "!" ignore the case if button is null
const buttonEle = document.querySelector("button");
// create array with default array type/ generic type
const numResults = [];
const textResults = [];
// "any" - any type, BUT as clear as possible
// "|" - union type
function add(num1, num2) {
    if (typeof num1 === "number" && typeof num2 === "number") {
        return num1 + num2;
    }
    if (typeof num1 === "string" && typeof num2 === "string") {
        return num1 + " " + num2;
    }
    return +num1 + +num2;
}
function printResult(resultObj) {
    console.log(resultObj.val);
}
buttonEle.addEventListener("click", function () {
    var num1 = num1Ele.value;
    var num2 = num2Ele.value;
    const result = add(+num1, +num2);
    numResults.push(result);
    const stringResult = add(num1, num2);
    textResults.push(stringResult);
    printResult({ val: result, timestamp: new Date() });
    console.log(numResults, textResults);
});
// this will throw error
// console.log(add("1", "6"));
// Promise is a generic type
// generic types can be tricky the first time you see them => give you extra type safety when working with more complex types or types
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(`It worked!`);
    }, 1000);
});
myPromise.then((result) => {
    console.log(result);
});
