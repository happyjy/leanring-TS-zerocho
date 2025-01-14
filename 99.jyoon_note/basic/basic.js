var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var man = { breath: true, breed: true, think: true };
// - ⭐️ type은 이와 같이 사용할 곳에서 사용할 수 있다. 하지만 interface는 불가능
var man1 = {
    breath: true,
    breed: true,
    think: true
};
var man2 = { breath: true, breed: true, think: true };
var man3 = { breath: true, breed: true, think: true };
var a3 = { talk: function () { }, eat: function () { }, shit: function () { } };
var a5a6 = { name: "jyoon" };
var a5a6_1 = { name: "jyoon", age: 34 };
// const a5a6_2: A5A6 = { name: "jyoon", age: 34 };
var a7 = { name: "jyoon", age: 34 }; // ⭐️ intersection을 사용하면 모든 타입이 선언해야 한다.
// const a7_1: A8 = { name: "jyoon" }; //  error: Property 'age' is missing in type
// - 넓은 타입, 좁은 타입을 서로 할당 할 때
// const a7_2: A8 = a5a6_1; // ⭐️ 넓은 타입(a5a6_1)을 좁은 타입(a7_2)으로 할당 할때 에러가 난다.
var a5a6_3 = a7; // ⭐️ 좁은 타입(a7)을 넓은 타입 a5a6_3으로 할당 가능하다
// - 객체 리터럴은 잉여 속성 검사가 있음.
// const a7_3: A8 = { name: "jyoon", age: 34, married: true }; // ⭐️ 잉여 속성 검사 때문에 married 부분에 에러가 난다. , 하지만 a7_4와 같은 과정을 거치면 잉여 속성 검사를 하지 않아 에러가 나지 않는다.
var a7_4 = { name: "jyoon", age: 34, married: true };
var a7_5 = a7_4;
// - 3곳에서 사용할 수 있는 void
function a4() {
    // return null; // error
    // return undefined; // ok
    // return; // ok
    // ok
}
/*
  3가지 위치에서 사용하는 void
  void_1. 함수 void
  void_2. 매개변수 callback function void
  void_3. 메서드로 선언할때 void

  void_1, void2: ⭐️ error를 발생하지 않는다.
    * 이유는 return을 사용하지 않겠다 라는 의미
  void_3: ⭐️ error 발생.
    * return 값이 없어야 한다.
*/
function a5(callback /* void_2 */) {
    // return 2; // error, bcz void_1
}
a5(function () { return 2; } /* void_2 */);
var human = {
    talk: function () {
        return 3;
    }
};
var talkRst = human.talk(); // ⭐️ talkRst의 type: void
var talkRst1 = human.talk(); // ⭐️ talkRst의 type은 number
// const talkRst2 = <number><unknown>human.talk(); // 위와 같은 의미
console.log("talkRst: ", talkRst);
//- void 타입은 return값을 사용하지 안 겠다는 뜻(메서드나 매개변수에서는 리턴값 사용 가능, but 조심해야 함)
// declare: 구형도를 사용하지 않고 function forEach를 사용할 수 있는 방법, 외부에서 선언한 것을 사용하기 위해서 declare를 선언하고 사용한다.
// declare function forEach(
//   arr: number[],
//   callback: (el: number) => undefined /* 원인은 undefined */
// ): void; // ⭐️ error: target.push의 반환값은 int 값이다. 여기서 callback 부분에 undefined와 상이하기 때문에 error가 발생한다.
// declare function forEach(arr: number[], callback: (el: number) => void): void;
var target = [];
// forEach([1, 2, 3], (el) => target.push(el));
// [1, 2, 3].forEach((el) => target.push(el));
// -
try {
}
catch (error) {
    error; // type: unknown
}
// - 타입 가드
var A9 = /** @class */ (function () {
    function A9() {
    }
    A9.prototype.aaa = function () { };
    return A9;
}());
var B3 = /** @class */ (function () {
    function B3() {
    }
    B3.prototype.bbb = function () { };
    return B3;
}());
function aOrB(param) {
    if (param instanceof A9) {
        param.aaa();
    }
}
aOrB(new A9());
aOrB(new B3());
function typeCheck(a) {
    if (a.type === "b") {
        a.bbb;
    }
    else if (a.type === "c") {
        a.ccc;
    }
    else {
        a.ddd;
    }
    if ("bbb" in a) {
        a.type;
    }
    else if ("ccc" in a) {
        a.ccc;
    }
    else {
        a.ddd;
    }
}
function catOrDog(a) {
    if (a.meow) {
        return false;
    }
    return true;
}
function pet(pet) {
    if (catOrDog(pet)) {
        console.log("pet > dog: ", pet.bow);
    }
    if ("meow" in pet) {
        console.log("pet > cat: ", pet.meow);
    }
}
var cat = { meow: 3 };
pet(cat);
var a8 = { a: "hi", b: "hello", c: "jyoon", d: "world" };
var a9 = { a: 11, b: 11, c: 11, d: 11 };
var a10 = {
    Human: 11,
    Mammal: 11,
    Animal: 11
};
var a11 = {
    Human: "Human",
    Mammal: "Mammal",
    Animal: "Animal"
};
// - class 기초
var A18 = /** @class */ (function () {
    /* ⭐️ 기본값이 있을때 는 ? 연산자를 쓰지못한다. */
    function A18(a, b, c) {
        if (b === void 0) { b = 123; }
        this.a = a;
        this.b = b;
        this.c = c;
    }
    A18.prototype.method = function () { };
    return A18;
}());
new A18("1234");
var a12 = new A18("1234"); // 클래스 이름은(A19) 인스턴스를 가르킨다.
var a13 = A18; // typeof A19: class 자체
// const a13: typeof A18 = new A18("1234"); // error
// typescript의 private을 사용하는것이 더 좋다고함
//  (하지만 js로 변환시 public으로 변한다고 한다. 하지만, ts에서 작업할때는 접근이 불가능해 컴파일이 안된다. 즉 사용해도 된다. )
// 이유는 typescript는 protected도 제공해주지만 js에서는 제공하지 않음.
var A20 = /** @class */ (function () {
    // #b: number;
    function A20(a, b) {
        if (b === void 0) { b = 123; }
        this.a = a;
        // this.#b = b;
    }
    A20.prototype.method = function () { };
    return A20;
}());
var B6 = /** @class */ (function () {
    function B6() {
        this.a = "12341";
        this.b = "1234";
        this.c = "wow";
        this.d = "wow";
    }
    B6.prototype.method = function () {
        console.log(this.a);
        console.log(this.b);
        console.log(this.c);
        console.log(this.d);
    };
    return B6;
}());
var C2 = /** @class */ (function (_super) {
    __extends(C2, _super);
    function C2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    C2.prototype.method = function () {
        // console.log(this.a); // a 접근 제한 됨
        console.log(this.b);
        console.log(this.c);
        console.log(this.d);
    };
    return C2;
}(B6));
// console.log("new C2().a: ", new C2().a);
// console.log("new C2().b: ", new C2().b);
console.log("new C2().c: ", new C2().c);
