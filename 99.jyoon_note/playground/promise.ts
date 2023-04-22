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

// 타입 "Awaited"를 보면 타입을 재귀적으로 짜서 flat하게 풀 수 있다.
type Result = Awaited<Promise<Promise<Promise<number>>>>;

//
type Copy_Awaited<T> = T extends null | undefined
  ? T // special case for `null | undefined` when not in `--strictNullChecks` mode
  : T extends object & { then(onfulfilled: infer F, ...args: infer _): any } // `await` only unwraps object types with a callable `then`. Non-object types are not unwrapped
  ? F extends (value: infer V, ...args: infer _) => any // if the argument to `then` is callable, extracts the first argument
    ? Awaited<V> // recursively unwrap the value
    : never // the argument to `then` was not callable
  : T; // non-object or non-thenable

/*
  - conditional type, infer가 중요하다.
    - 위 Copy_Awatied는 재귀적이 형태를 가졌다.
  - infer
    - 타입을 추론을 해준다
    - 새로 타입을 새로운 타입 변수를 만들어 낸다.
    - 만들어진 F를 통해서 타입 주론을 한다.
  - 코드 설명: "then(onfulfilled: infer F, ...args: infer _): any"
    - 이부분을 Promise로 하지 않고 이렇게 작성하는 것을 duckTyping이라고 부른다.
    - Promise를 직접 작성하지 않고 Promise 타입을 작성하는 것
    - 아래 type Result2를 보면 "Promise<number>"대신에 이렇게 작성 할 수 있다.
 */

//

type Result2 = Awaited<{ then(onfulfilled: (v: number) => number): any }>; // thenable
/*
  - Teyp Result에서 Promise<number> 부분을 "then(onfulfilled: (v: number) => number): any" 이렇게 교체해서 사용할 수 있다.
 */
