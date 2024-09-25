interface User {
  id: string;
  name: string;
  age: number;
  password: string;
  email: string;
}

// Pick: allows you to pick properties from an existing type to create a new type
type UpdatedProps = Pick<User, "name" | "age" | "email">;

//convert all the keys into optional
type UpdatedPropsOptinal = Partial<UpdatedProps>;

function sumOfAge(
  user1: UpdatedPropsOptinal,
  user2: UpdatedPropsOptinal
): number {
  return user1.age + user2.age;
}

console.log(sumOfAge({ name: "abc", age: 29 }, { name: "xyz", age: 39 }));

//creating an object
// type UsersAge = {
//   [key: string]: number;
// };

// better way of creating an object is by using record
type UsersAge = Record<string, { age: number; name: string }>;

// users is an object of objects
const users: UsersAge = {
  "sam@123": { age: 21, name: "sam" },
  "tina@123": { age: 13, name: "tina" },
};

// exclude
type EventType = "click" | "scroll" | "mousemove";
type ExcludeEvent = Exclude<EventType, "mouseover">;

const handleEvent = (event: ExcludeEvent) => {
  console.log(`Handling event ${event}`);
};

handleEvent("click");
