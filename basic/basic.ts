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
