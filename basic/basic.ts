const a: number = 5;
function add(x: number, y: number): number {
  return x + y;
}

//---
// 함수로 표현하는 방법에는 아래 3가지 방법이 있으며 case1,2 방법을 많이 사용한다.

// case1
const add1: (x: number, y: number) => number = (x, y) => x + y;

// case2
type Add = (x: number, y: number) => number;
const add2: Add = (x, y) => x + y;

// case3
interface Add1 {
  (x: number, y: number): number;
}
const add3: Add1 = (x, y) => x + y;

//---
const arr: string[] = ["123", "456"];
const arr2: number[] = [123, 456];
const arr3: Array<number> = [123, 456]; // 제네릭 표현 방법

//--- tuple
const arr4: [number, number, string] = [123, 456, "aaa"];

//---
const obj: { lat: number; lon: number } = { lat: 37.5, lon: 127.5 };

// let aa = 123;
// aa = "hi" as unknown as number;

// - 빈배열일때 never 타입으로 추론한다.
try {
  const array1 = []; // const array: never[]
  const array: number[] = []; // const array: never[]
  array.push(0);
} catch (error) {
  error;
}

//- 최대 한 ! 대신 if를 쓸 것
// const head: Element = document.querySelector("#head");
// const head1: Element = document.querySelector("#head")!;

// - string과 String은 다름. 소문자로 하는 것 기억하기.
const aa: string = "hello";
const bb: String = "hell"; // new String()
// function cc(a1: string, b2: string){}
function cc(a1: string, b2: String) {}
cc(aa, bb);

// - 템플릿 리터럴 타입이 존재(유니언 등 사용 가능)
type World = "world" | "hell";
const a1: World = "world";
// type Greeting = "hello world"
type Greeting = `hello ${World}`;
const c: Greeting = "hello hell";
const c1: Greeting = "hello world";

// - 배열, 튜플 문법
function rest(a, ...args: string[]) {
  console.log("rest: ", a, args); // 1 [ '2', '3' ]
}
rest("1", "2", "3");

const tuple: [string, number] = ["1", 1];
// tuple[2] = "hello"; // ts가 이건 막음
tuple.push("hello"); // ts가 이건 못 막음
console.log("tuple: ", tuple);

// - enum, keyof, typeof
const enum EDirection {
  Up = 3,
  Down,
  Left,
  Right,
}
console.log("EDirection.Left: ", EDirection.Left);

const ODirection = {
  Up: 100,
  Down: 101,
  Left: 102,
  Right: 103,
} as const;
console.log("ODirection.Left: ", ODirection.Left);

type key1 = keyof typeof ODirection; // ⭐️ type key1 = "Up" | "Down" | "Left" | "Right"
type Direction = typeof ODirection[key1]; // ⭐️ type Direction = 100 | 101 | 102 | 103

const obj1 = { a: 1, b: 2, c: 3 } as const;
type key = keyof typeof obj1; // obj1 객체의 key들만 타입으로 뽑아내고 싶을때
// == type key = "a" | "b" | "c"

function run(dir: Direction) {
  console.log("### run > dir: ", dir);
}

// - union, intersection
type A = {
  a: string;
};
type B = {
  b: string;
};

const aa1: A | B = { a: "hello", b: "world" };
const aa2: A | B = { a: "hello" };

const bb1: A & B = { a: "hello", b: "world" };
// const bb2: A & B = { a: "hello" }; // ⭐️ & 연산자로 A, B 두 타입을 엮었기 때문에 a, b 변수가 모두 있어야 한다.

// - type, interface 상속

type Animal = { breath: true };
type Mammal = Animal & { breed: true };
type Human = Mammal & { think: true };

const man: Human = { breath: true, breed: true, think: true };

// - ⭐️ type은 이와 같이 사용할 곳에서 사용할 수 있다. 하지만 interface는 불가능
const man1: Animal & { breed: true; think: true } = {
  breath: true,
  breed: true,
  think: true,
};

interface IAnimal {
  breath: true;
}
interface IMammal extends IAnimal {
  breed: true;
}
interface IHuman extends IMammal {
  think: true;
}

// - ⭐️ interface, type을 섞어서 사용 가능
interface IHuman1 extends Mammal {
  think: true;
}
type Human1 = IMammal & { think: true };

const man2: IHuman1 = { breath: true, breed: true, think: true };
const man3: Human1 = { breath: true, breed: true, think: true };

// - ⭐️ interface는 선언 할때 마다 합쳐 진다.
interface A1 {
  talk: () => void;
}
interface A1 {
  eat: () => void;
}
interface A1 {
  shit: () => void;
}
const a3: A1 = { talk() {}, eat() {}, shit() {} };

// 넓은 타입, 좁은 타입
type A2 = string | number; // 넓은 타입
type A3 = string; // 좁은 타입
type A4 = string & number; //

// 넓은 타입, 좁은 타입
type A5 = { name: string }; // 넓은 타입
type A6 = { age: number }; // 넓은 타입

type A5A6 = A5 | A6; // 넓은 타입

type A7 = { name: string; age: number }; // 좁은 타입(구체적일 수록 좁은타입)
type A8 = A5 & A6; // A7과 같은 의미

const a5a6: A5A6 = { name: "jyoon" };
const a5a6_1: A5A6 = { name: "jyoon", age: 34 };
// const a5a6_2: A5A6 = { name: "jyoon", age: 34 };

const a7: A8 = { name: "jyoon", age: 34 }; // ⭐️ intersection을 사용하면 모든 타입이 선언해야 한다.
// const a7_1: A8 = { name: "jyoon" }; //  error: Property 'age' is missing in type

// 넓은 타입, 좁은 타입을 서로 할당 할 때
// const a7_2: A8 = a5a6_1; // ⭐️ 넓은 타입(a5a6_1)을 좁은 타입(a7_2)으로 할당 할때 에러가 난다.
const a5a6_3: A8 = a7; // ⭐️ 좁은 타입(a7)을 넓은 타입 a5a6_3으로 할당 가능하다

// - 객체 리터럴은 잉여 속성 검사가 있음.
// const a7_3: A8 = { name: "jyoon", age: 34, married: true }; // ⭐️ 잉여 속성 검사 때문에 married 부분에 에러가 난다. , 하지만 a7_4와 같은 과정을 거치면 잉여 속성 검사를 하지 않아 에러가 나지 않는다.
const a7_4 = { name: "jyoon", age: 34, married: true };
const a7_5: A8 = a7_4;
