const num1Ele = document.getElementById(`num1`) as HTMLInputElement;
const num2Ele = document.getElementById(`num2`) as HTMLInputElement;

// "!" ignore the case if button is null
const buttonEle = document.querySelector("button")!;

// create array with default array type/ generic type
const numResults: Array<number> = [];
const textResults: string[] = [];

// define type aliases & interfaces
type NumOrString = number | string;
type Result = { val: number; timestamp: Date };
// type interfaces
interface ResultObj {
  val: number;
  timestamp: Date;
}

// "any" - any type, BUT as clear as possible
// "|" - union type
function add(num1: NumOrString, num2: NumOrString) {
  if (typeof num1 === "number" && typeof num2 === "number") {
    return num1 + num2;
  }
  if (typeof num1 === "string" && typeof num2 === "string") {
    return num1 + " " + num2;
  }
  return +num1 + +num2;
}

function printResult(resultObj: ResultObj) {
  console.log(resultObj.val);
}

buttonEle.addEventListener("click", function () {
  var num1 = num1Ele.value;
  var num2 = num2Ele.value;
  const result = add(+num1, +num2);
  numResults.push(result as number);
  const stringResult = add(num1, num2);
  textResults.push(stringResult as string);
  printResult({ val: result as number, timestamp: new Date() });
  console.log(numResults, textResults);
});

// this will throw error
// console.log(add("1", "6"));

// Promise is a generic type
// generic types can be tricky the first time you see them => give you extra type safety when working with more complex types or types
const myPromise = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    resolve(`It worked!`);
  }, 1000);
});

myPromise.then((result) => {
  console.log(result);
});
