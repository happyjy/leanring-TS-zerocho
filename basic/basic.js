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
