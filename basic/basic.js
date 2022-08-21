var a = 5;
function add(x, y) {
    return x + y;
}
//---
// 함수로 표현하는 방법에는 아래 3가지 방법이 있으며 case1,2 방법을 많이 사용한다.
// case1
var add1 = function (x, y) { return x + y; };
var add2 = function (x, y) { return x + y; };
var add3 = function (x, y) { return x + y; };
//---
var arr = ["123", "456"];
var arr2 = [123, 456];
var arr3 = [123, 456]; // 제네릭 표현 방법
//--- tuple
var arr4 = [123, 456, "aaa"];
//---
var obj = { lat: 37.5, lon: 127.5 };
// let aa = 123;
// aa = "hi" as unknown as number;
// - 빈배열일때 never 타입으로 추론한다.
try {
    var array1 = []; // const array: never[]
    var array = []; // const array: never[]
    array.push(0);
}
catch (error) {
    error;
}
//- 최대 한 ! 대신 if를 쓸 것
// const head: Element = document.querySelector("#head");
// const head1: Element = document.querySelector("#head")!;
// - string과 String은 다름. 소문자로 하는 것 기억하기.
var aa = "hello";
var bb = "hell"; // new String()
// function cc(a1: string, b2: string){}
function cc(a1, b2) { }
cc(aa, bb);
var a1 = "world";
var c = "hello hell";
var c1 = "hello world";
// - 배열, 튜플 문법
function rest(a) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    console.log("rest: ", a, args); // 1 [ '2', '3' ]
}
rest("1", "2", "3");
var tuple = ["1", 1];
// tuple[2] = "hello"; // ts가 이건 막음
tuple.push("hello"); // ts가 이건 못 막음
console.log("tuple: ", tuple);
console.log("EDirection.Left: ", 5 /* EDirection.Left */);
var ODirection = {
    Up: 100,
    Down: 101,
    Left: 102,
    Right: 103
};
console.log("ODirection.Left: ", ODirection.Left);
var obj1 = { a: 1, b: 2, c: 3 };
// == type key = "a" | "b" | "c"
function run(dir) {
    console.log("### run > dir: ", dir);
}
var aa1 = { a: "hello", b: "world" };
var aa2 = { a: "hello" };
var bb1 = { a: "hello", b: "world" };
var bb2 = { a: "hello" }; // ⭐️ & 연산자로 A, B 두 타입을 엮었기 때문에 a, b 변수가 모두 있어야 한다.
