let num: number = 123;

type User = {
    name: string;
    age: number;
    gender?: "male" | "female";
}

let alice: User = {
    name: "Alice",
    age: 22,
    gender: "female"
}

interface Student {
    name: string;
    age: number;
    grade?: number;
}

let bob: Student = {
    name: "Bob",
    age: 22,
}

function hello(user: { name: string }) {
    return user.name;
}

type Res<T> = {
    data: T;
    status: 200 | 400,
}

const userResponse: Res<User> = {
    data: { name: "Tom", age: 22, gender: "male" },
    status: 200,
}

const studentResponse: Res<Student> = {
    data: { name: "Eve", age: 22, grade: 80 },
    status: 200,
}
