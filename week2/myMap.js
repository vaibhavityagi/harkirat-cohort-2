function transform(i) {
  return i * 2;
}

// what Array.prototype.map does under the hood
function myMap(arr, fn) {
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(fn(arr[i]));
  }
  return newArr;
}

const nums = [1, 2, 3, 4];

// multiplies each element by 2 or applies the transform function to each element and returns a new array
console.log(myMap(nums, transform)); // [2, 4, 6, 8]

const usingMap = nums.map(function (ele) {
  return ele * 2;
});
console.log(usingMap);
