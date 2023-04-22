"use strict";
// 강의: 완전 복잡한 타입 분석하기(Promise와 Awaited 편)
//  * Promise.all의 타입 중 return 타입에 "Awaited" 라는 타입을 중점 적으로 설명하고 있다.
const p1 = Promise.resolve(1)
    .then((a) => a + 1)
    .then((a) => a + 1)
    .then((a) => a.toString());
const p2 = Promise.resolve(2);
const p3 = new Promise((res, rej) => {
    setTimeout(res, 100);
});
Promise.all([p1, p2, p3]).then((result) => {
    console.log(result); //(parameter) result: [string, number, unknown]
});
/*
  - Teyp Result에서 Promise<number> 부분을 "then(onfulfilled: (v: number) => number): any" 이렇게 교체해서 사용할 수 있다.
 */
