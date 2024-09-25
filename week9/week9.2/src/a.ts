let x: number = 1;
console.log(x);

function greet(firstName: string) {
  console.log(`Hello ${firstName}`);
}

// the return type of a function can be inferred
// i.e ts complier can figure out the return type of the function from the given inputs without expolicitly mentioning a return type
function sum(a: number, b: number): number {
  return a + b;
}

function isLegal(age: number): boolean {
  return age >= 18 ? true : false;
}

function runAfter1S(fn: () => void) {
  setTimeout(fn, 1000);
}

greet("Vaibhavi from ts");
console.log(sum(2, 3));
console.log(isLegal(23));
runAfter1S(() => console.log("i ran after 1 sec"));

// type of objects is defined used interface
interface User {
  firstName: string;
  lastName: string;
  // question mark makes email an optional key
  email?: string;
  age: number;
}
// isLegal using interface
function isLegal2(user: User): boolean {
  return user.age >= 18 ? true : false;
}

console.log(
  isLegal2({
    firstName: "vaibhavi",
    lastName: "tyagi",
    age: 20,
  })
);

// interfaces can be implemented
interface Person {
  name: string;
  age?: number;
  greet(phrase: string): void; //void is the return type of the function
}

class Employee implements Person {
  // name aage this ke saath use ho rha h isliye idhar likhna imp h
  // and uske baad constructor se initalize bhi krna h
  name: string;
  age: number;

  constructor(n: string, a: number) {
    this.name = n;
    this.age = a;
  }

  greet(phrase: string): void {
    console.log(`${phrase} ${this.name}`);
  }
}

const e = new Employee("param", 28);
e.greet("Hello Mr. ");

// difference between interface and type
// type allows union and intersection
// interface can be implemented
// use interface mostly, type in cases when you can't use an interface
type User2 = {
  firstName: string;
  lastName: string;
  email?: string;
};

// print id of a user and id can be a number or string
/* 
function printId(id: string | number): void {
  console.log(`ID: ${id}`);
}
*/

// or using type
type ArgType = string | number;
function printId(id: ArgType): void {
  console.log(`ID: ${id}`);
}

printId(10);
printId("10");

type Employee2 = {
  name: string;
  startDate: Date;
};

type Manager = {
  name: string;
  department: string;
};

type TeamLead = Employee2 & Manager;

// TeamLead now has the keys of both Employee2 and Manager types
const teamLead: TeamLead = {
  name: "harkirat",
  startDate: new Date(),
  department: "Software developer",
};

console.log(teamLead);

// arrays
function printArray(arr: number[]): void {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}

printArray([3, 2, 1]);

// array of objects
function printArrayOfObjects(arr: User2[]) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}

printArrayOfObjects([
  { firstName: "vaibhavi", lastName: "tyagi" },
  { firstName: "sunita", lastName: "cage" },
]);

// enums
enum Direction {
  // 0, 1, 2, 3 are the default values
  // we can also give the constants string values or other numberic values
  Up, //0
  Down, //1
  Left, //2
  Right, //3
}

function doSomething(keyPressed: Direction) {
  if (keyPressed == Direction.Up) console.log(Direction.Up);
  // etc
}

doSomething(Direction.Up);

// common use case in express
/*
enum ResponseStatus {
  Success = 200,
  NotFound = 404,
  Error = 500
}

app.get("/', (req, res) => {
  if (!req.query.userId) {
    res.status(ResponseStatus.Error).json({})
  }
  // and so on...
  res.status(ResponseStatus.Success).json({});
})
 */

// generics
// T can be any type, primitive or non-primitive
function identify<T>(arg: T): T {
  return arg;
}

console.log(identify<string>("iMAString"));
console.log(identify<number>(101));
