let name = "Alice";
let age = 22;

let user1 = { name: name, age: age };
let user2 = { name, age }; // property shorthen

let arr = [1, 2, 3];
let a = arr[0];
let b = arr[1];
let [x, y] = arr; // array destructure (x=1, y=2)

let obj = { mode: "light", show: true };
let { mode, show } = obj; // object destructure (mode=light, show=tru)

let arr1 = [1, 2];
let arr2 = [8, 9];
let arr3 = [arr1, arr2]; // [Array, Array]
let arr4 = [...arr1, ...arr2]; // array spread [1, 2, 8, 9]
let arr5 = [7, ...arr1]; // [7, 1, 2]

cond ? true : false;

const value = data || "default";

cond || cond;
// f || f = f
// t || f = t
// f || t = t
// t || t = t

cond && cond;
// f && f = f
// t && f = f
// f && t = f
// t && t = t

data && "do something";

!!"abc";

// Higher order function
function add() {
	return function () {
		// add to list
	};
}

add()();

[1, 2, 3, 4, 5].map(n => n + 1);
[1, 2, 3, 4, 5].filter(n => true);
[1, 2, 3, 4, 5].reduce((a, b) => a + b)