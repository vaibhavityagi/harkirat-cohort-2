"use strict";
let x = 1;
console.log(x);
function greet(firstName) {
    console.log(`Hello ${firstName}`);
}
function sum(a, b) {
    return a + b;
}
function isLegal(age) {
    return age >= 18 ? true : false;
}
function runAfter1S(fn) {
    setTimeout(fn, 1000);
}
greet("Vaibhavi from ts");
console.log(sum(2, 3));
console.log(isLegal(23));
runAfter1S(() => console.log("i ran after 1 sec"));
function isLegal2(user) {
    return user.age >= 18 ? true : false;
}
console.log(isLegal2({
    firstName: "vaibhavi",
    lastName: "tyagi",
    age: 20,
}));
class Employee {
    constructor(n, a) {
        this.name = n;
        this.age = a;
    }
    greet(phrase) {
        console.log(`${phrase} ${this.name}`);
    }
}
const e = new Employee("param", 28);
e.greet("Hello Mr. ");
function printId(id) {
    console.log(`ID: ${id}`);
}
printId(10);
printId("10");
const teamLead = {
    name: "harkirat",
    startDate: new Date(),
    department: "Software developer",
};
console.log(teamLead);
function printArray(arr) {
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }
}
printArray([3, 2, 1]);
function printArrayOfObject(arr) {
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }
}
printArrayOfObject([
    { firstName: "vaibhavi", lastName: "tyagi" },
    { firstName: "sunita", lastName: "cage" },
]);
