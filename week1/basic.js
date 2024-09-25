// function to greet a person given their first and last name
function greet(firstName, lastName) {
  console.log(`Hi, welcome ${firstName} ${lastName}`);
}

// greet a person based on their gender
function greetOnGender(firstName, lastName, gender) {
  if (gender === "M") {
    console.log(`Hi Mr. ${firstName} ${lastName}`);
  } else {
    console.log(`Hi Mrs. ${firstName} ${lastName}`);
  }
}

// printing i from 0 to 1000
// for (let i = 0; i <= 1000; i++) {
//   console.log(`i = ${i}`);
// }

// greet("Harkirat", "Singh");
// greetOnGender("Mahima", "Singh", "F");

// print the even numbers in an array
const ages = [12, 23, 32, 21, 30, 45, 25, 23];

for (let a = 0; a < ages.length; a++) {
  if (ages[a] % 2 == 0) {
    console.log(ages[a]);
  }
}

// print the biggest number in an array
let max = 0;
for (let i = 0; i < ages.length; i++) {
  if (ages[i] > ages[max]) max = i;
}
console.log("Maximum age: " + ages[max]);

// male's first name
const people = [
  { gender: "male", firstName: "Nitin", lastName: "Mukesh", age: 23 },
  { gender: "female", firstName: "Niti", lastName: "Rana", age: 32 },
  { gender: "male", firstName: "Nitish", lastName: "Rai", age: 25 },
];

for (let i = 0; i < people.length; i++) {
  if (people[i].gender == "male") {
    console.log(people[i].firstName);
  }
}

// reverse the array
for (let i = ages.length - 1; i >= 0; i--) {
  console.log(ages[i]);
}
