const nums = [1,3,5,7];

const numsDoubled = nums.map(number => number *2);
console.log(numsDoubled);  // [2, 6, 10, 14]

// No return from map's callback fn
const undefArray = nums.map(number => {
            let double = nums*2;
});
console.log(undefArray); // [undefined, undefined, undefined, undefined]

// ===============================================
const studentMarks = [65,75,63,58,69];
const totalMarks = studentMarks.reduce((accumulator, currentElement) => accumulator + currentElement);

console.log(totalMarks); // 330

// ===============================================
const studentMarks = [65,75,63,58,69];
const totalMarks = studentMarks.reduce((acc, currentElement) => acc + currentElement, 20);  // accumulator's initial value is 20

console.log(totalMarks); // 350

// ===============================================
const array = [1,-1,2,3,-5];
const positiveArray = array.filter(num => num >= 0);
console.log(positiveArray) // [1, 2, 3]
