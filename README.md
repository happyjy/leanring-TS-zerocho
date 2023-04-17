<!-- TOC -->

- [ts-all-in-one](#ts-all-in-one)
  - [실습할 자료 링크소스 코드 버전에 따라 변동 가능](#%EC%8B%A4%EC%8A%B5%ED%95%A0-%EC%9E%90%EB%A3%8C-%EB%A7%81%ED%81%AC%EC%86%8C%EC%8A%A4-%EC%BD%94%EB%93%9C-%EB%B2%84%EC%A0%84%EC%97%90-%EB%94%B0%EB%9D%BC-%EB%B3%80%EB%8F%99-%EA%B0%80%EB%8A%A5)
- [기본 지식](#%EA%B8%B0%EB%B3%B8-%EC%A7%80%EC%8B%9D)
  - [ts 문법](#ts-%EB%AC%B8%EB%B2%95)
  - [utility types로 알아보기](#utility-types%EB%A1%9C-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0)
- [ts 라이브러리 분석](#ts-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EB%B6%84%EC%84%9D)
  - [모듈 시스템](#%EB%AA%A8%EB%93%88-%EC%8B%9C%EC%8A%A4%ED%85%9C)
  - [jQuery의 타이핑](#jquery%EC%9D%98-%ED%83%80%EC%9D%B4%ED%95%91)
  - [axios의 타이핑](#axios%EC%9D%98-%ED%83%80%EC%9D%B4%ED%95%91)
  - [react의 타이핑](#react%EC%9D%98-%ED%83%80%EC%9D%B4%ED%95%91)
  - [redux의 타이핑](#redux%EC%9D%98-%ED%83%80%EC%9D%B4%ED%95%91)
  - [react-redux의 타이핑](#react-redux%EC%9D%98-%ED%83%80%EC%9D%B4%ED%95%91)
  - [Node의 타이핑](#node%EC%9D%98-%ED%83%80%EC%9D%B4%ED%95%91)
  - [Express의 타이핑](#express%EC%9D%98-%ED%83%80%EC%9D%B4%ED%95%91)

<!-- /TOC -->

# ts-all-in-one

- [typescript 공식문서](https://www.typescriptlang.org/)
- [typescript 플레이그라운드](https://www.typescriptlang.org/play)
- [typescript 핸드북 필독](https://www.typescriptlang.org/docs/handbook/intro.html)
- [typescript 버전 수정 내역](https://www.typescriptlang.org/docs/handbook/release-notes/overview.html)

## 실습할 자료 링크(소스 코드 버전에 따라 변동 가능)

- [axios](https://github.com/axios/axios/blob/v1.x/index.d.ts)
- [react](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts)
- [nodejs](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/node/index.d.ts)
- [express](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/express/index.d.ts)
- [jQuery](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/jquery/JQuery.d.ts)
- [redux](https://github.com/reduxjs/redux/blob/master/src/index.ts)

애초에 ts인 redux, 패키지 내부에서 d.ts를 제공하는 axios, @types 패키지가 별도로 존재하는 react, node, express, jquery로 구분됨. @types는 DefinitelyTyped라는 프로젝트로, 커뮤니티에서 라이브러리 타이핑을 제공하는 것.

# 기본 지식

- 메인 룰: typescript는 최종적으로 javascript로 변환된다. 순전한 typescript 코드를 돌릴 수 있는 것은 deno이나 대중화되지가 않았음. 브라우저, 노드는 모두 js 파일을 실행한다.
- typescript는 언어이자 컴파일러(tsc)이다. 컴파일러는 ts 코드를 js로 바꿔준다.
- tsc는 tsconfig.json(tsc --init 시 생성)에 따라 ts 코드를 js(tsc 시 생성)로 바꿔준다. 인풋인 ts와 아웃풋인 js 모두에 영향을 끼치므로 tsconfig.json 설정을 반드시 봐야한다.
- 단순히 타입 검사만 하고싶다면 tsc --noEmit 하면 된다.
- 개인 의견: tsconfig.json에서 그냥 esModuleInterop: true, strict: true 두 개만 주로 켜놓는 편. strict: true가 핵심임.
- ts 파일을 실행하는 게 아니라 결과물인 js를 실행해야 한다.
- 에디터가 필수가 됨. VS Code나 웹스톰 반드시 필요. 메모장으로 코딩 불가능한 지경에 이름.

## ts 문법

- 기본적으로 변수, 속성, 매개변수, 리턴값에 타입이 붙었다고 생각하면 됨.

  - 분석 팁!

    - ":" 기준으로 뒤로 Typscript 코드가 온다고 생각하면 되겠다.

  ```typescript
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
  ```

- [❗️POINT]특수한 타입 {} (null과 undefined가 아닌 모든 타입)

  ```typescript
  const z: {} = 5;
  ```

- <u>ts가 추론해주는 타입이 있는데 이런 건 그냥 그대로 사용하면 됨.</u>

  - ts가 추론하지 못하는 경우에만 직접 타이핑할 것.
  - 예를 들어 const에 선언된 값들은 타입 추론을 적극 활용하면 되겠다.
  - 하지만 tuple에서 string, number가 있을 경우 union으로 "(string | number)[]" 이런 타입을 선언하므로 주의해야 할 필요도 있다.

    ```typescript
    const a = 5;
    const b = "3";
    const c = a + b;
    function add(x: number, y: number) {
      return x + y;
    }
    ```

- ":"뒷부분, as뒷부분, <>부분, interface, type, function 일부를 제외하면 자바스크립트와 동일.

  - 제외하고 생각하는 연습을 초반에 해야 함.
  - <>: generic

    ```typescript
    const obj: { lat: number; lon: number } = { lat: 37.5, lon: 127.5 };
    const obj = { lat: 37.5, lon: 127.5 };

    const a = document.querySelector("#root") as HTMLDivElement;
    const a = document.querySelector("#root");

    function add<T>(x: T, y: T): T {
      return x + y;
    }
    function add(x, y) {
      return x + y;
    }

    interface A {}
    type A = {};
    ```

- 아래와 같이 선언적 함수인데 타입만 되어 있고, 선언된 함수가 동시에 올 수도 있다.

  ```typescript
  function add(x: number, y: number): number;
  function add(x, y) {
    return x + y;
  }
  ```

- 자바스크립트에 비해서 자유도가 확 줄어듦(ex: 변수에 문자열을 넣었다가 숫자로 바꾸는 등의 행동 어려워짐)

  ```typescript
  let x = 5;
  x = "hello";
  ```

- any를 최대한 쓰지 않는 것을 목표로 할 것.

  - never, unknown, any 타입 주의하기. any는 최대한 피하고 쓰더라도 나중에 꼭 제대로 타이핑하기.
    [never 좋은 설명 글-toast ui](https://ui.toast.com/weekly-pick/ko_20220323)

  - [❗️POINT]빈배열일때 never 타입으로 추론한다.

    - 아래 `const array = [];` 코드를 TS 가 `const array: never[]`로 해석한다.
      위 toast ui에 never 좋은 설명 글 확인하기
    - 그래서 push 할때 에러가 난다.

    ```typescript
    try {
      const array = []; // const array: never[]
      array[0];
    } catch (error) {
      error;
    }
    ```

- [❗️POINT]최대 한 ! 대신 if를 쓸 것

  - !: null, undefined를 아님을 보증하는 코드

    ```typescript
    const head = document.querySelector("#head")!;
    console.log(head);

    const head = document.querySelector("#head");
    if (head) {
      console.log(head);
    }
    ```

- [❗️POINT]string과 String은 다름. 소문자로 하는 것 기억하기.

  ```typescript
  const a: string = "hello";
  const b: String = "hell"; // [❗️POINT]String -> new String()
  ```

- 템플릿 리터럴 타입이 존재(유니언 등 사용 가능)

  ```typescript
  type World = "world" | "hell";

  // type Greeting = "hello world"
  type Greeting = `hello ${World}`;

  // const c: Greating = 입력 후 trigger suggest 하면 "hello hell", "hello world" 두개가 추천 된다.
  ```

- 배열, 튜플 문법

  ```typescript
  let arr: string[] = [];
  let arr2: Array<string> = [];

  //
  function rest(...args: string[]) {}
  function rest1(a, ...args: string[]) {
    console.log(a, args); // 1 [ '2', '3' ]
  }
  rest1("1", "2", "3");

  //
  const tuple: [string, number] = ["1", 1];
  tuple[2] = "hello"; // ts가 이건 막음
  tuple.push("hello"); // [❗️POINT]ts가 이건 못 막음
  ```

- enum, keyof, typeof

  - enum을 js로 컴파일 했을때
    - js로 변환했을때 코드로 남지 안는다.
    - 객체(아래 코드에서 ODirection)는 js 코드로 변환된다.
    - [❗️POINT]웬만해서는 js파일로 코드를 남기는게 좋다고한다. 즉 객체를 적극 활용하자.
  - 객체에서 as const 의미

    - 선언된 값으로 type을 고정시키겠다는 의미
    - ODirection객체에 as const 가없으면 아래와 같은 타입으로 추론한다.

      ```
        const ODirection: {
            Up: number;
            Down: number;
            Left: number;
            Right: number;
        }
      ```

    - as const 있는 경우 타입

      ```
        const ODirection: {
          readonly Up: 100;
          readonly Down: 101;
          readonly Left: 102;
          readonly Right: 103;
        }
      ```

  - enum 쓰기 싫어서 object썻더니 Object를 활용할때 "keyof typeof"를 사용해야 해야해서 복잡하게 됐지만 "keyof typeof"를 알게 되지 별거 아니게 됨.

    - [playground](https://www.typescriptlang.org/play?ssl=22&ssc=50&pln=21&pc=1#code/MYewdgzgLgBApmArgWxgUQCIEsBOdhRbgwDeAsAFAwwCqADgDSXUYgDuYTVMAMnAGZQu1AEpYA5gAshlAL6VMufIXAA6egG5KACgQoYyOMgBGcHAEp02PASJh1dGAF4YABkqVQkWAHlryu2dSZlo6AC4YAEZXV2EYVg4I6Mi4vkEk1wAmOLEpKAyAZi5ZGABDCBgvaC0KPyVbNU0dOhwQOjMoAE9Legj3CkoAekHaCCwwcRgoSTh4JFRyspg6UpxSwygzSn5EMAawGDZSgBsAa20AE1wIxRsVMEsSeQGKYZgASVg8AEdEJQrSgc4AAPKBrGDHcazKAgZaIY7HGAgRCwaazU5wToQShddowDGdSJBAkgfhTTrtUkwOp3OwaGBvQAK1IB4P5gAG1AOrkzIACj53gA5AAqAF1yXiCUSXAAiehSmAAHxgUoSYDliqlaSgaqVuWkUpxFNm-n2QVxcCpNIC4DZJLJZotxvuwvpTNZnJ5fKForN8Xq9yC0VcCqiriJiuimWD0QK212Jpwu0u119tPAj2elCOZ20tyt9k15hqCbA2kt+1UuqghY8LzetrF5rJgAXRmCAAGbAC6rgBxBzzgaBI4wAK0lpDKSQYMGMEWylQiBRgshqPoJxMxVPtZJAg8iLpGm6HMEAuDWAFpnABrj+MxgBOWwAznTBAAMLgFDxwA844AdDpggEV+wAio4AWhsABzUwQBvQ4AIuOADKtQwjE4LhLpiQRSqU2pSsY8HAFKQA)

    ```typescript
    const enum EDirection {
      Up,
      Down,
      Left,
      Right,
    }
    EDirection.Up;
    (enum member) EDirection.Up = 0

    const ODirection = {
      Up: 100,
      Down: 101,
      Left: 102,
      Right: 103,
    } as const;
    ODirection.Up;
    (property) Up: 0

    // Using the enum as a parameter
    function walk(dir: EDirection) {}

    // It requires an extra line to pull out the keys
    type key1 = keyof typeof ODirection; // ⭐️ [❗️POINT] type key1 = "Up" | "Down" | "Left" | "Right"
    type Direction = typeof ODirection[keyof typeof ODirection]; // ⭐️ [❗️POINT] type Direction = 100 | 101 | 102 | 103
    function run(dir: Direction) {}

    walk(EDirection.Left);
    run(ODirection.Right);


    // keyof typeof 에 대해서
    const obj1 = { a: 1, b: 2, c: 3 };
    type key = keyof typeof obj1; // obj1 객체의 key들만 타입으로 뽑아내고 싶을때
    // == type key = "a" | "b" | "c"
    ```

    - 객제 타이핑: type과 interface 구분하기

      ```typescript
      type A = { a: string };
      const a: A = { a: "hello" };

      interface B {
        a: string;
      }
      const b: B = { a: "hello" };
      ```

- [❗️POINT]union, intersection

  - type
    - 간단한 타입들은 type으로
  - interface
    - 객체지향 개념이 포함 됨
  - intersection(&)

    - 모든 속성이 다 있어야 한다.

  - [playground](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABAQwCaoBQA8BciDOUATjGAOaIA+iYIAtgEYCmRANIgJ56EnlU31mRAJTdipCtVqMWiAN4BYAFCJERJlBBEkWRAGpOAbmUBfZWkwBGdgCZhxpRYwAiS8-bObz++fQZriJ7eDspQHAAOTIgAgogAvPLKqshivGQOJg5hkYgAQvGJKogMqRIZIUoQCIQoyJZ4sdT5CXIoeM4AFkwANt1w7sXtAO5wRN2ozoiZylVgNcjINg38zfJtgV29-VMVszUMDPUxiABkeQWtKRs9fQMlgSNjEzuIAPSviIAK1IDwf6d4gBVdgAOWxCAWMHAIyDgBdxxCAE6bEIAI8cALaOAH1HEIAdVehADoZtUoMUGEtjmdVpd2ptbi93l9fmdAA+jgAaBwAJ44AdDpi7HygAUWxCAAYXAKHjgBFxxCAO9HABOjgAY6xCAGVbABzdgAXRlDsBiIQADPYAMIcAADWIf6cxEo9EYoA)

    ```typescript
    function add(x: string | number, y: string | number): string | number {
      return x + y;
    }
    add(1, 2);
    add("1", "2");
    add(1, "2");

    type A = {
      a: string;
    };
    type B = {
      b: string;
    };

    const aa1: A | B = { a: "hello", b: "world" };
    const aa2: A | B = { a: "hello" };

    const bb1: A & B = { a: "hello", b: "world" }; // ⭐️ &: 모든 속성이 다 있어야 한다.
    const bb2: A & B = { a: "hello" }; // [❗️POINT] => error ⭐️ & 연산자로 A, B 두 타입을 엮었기 때문에 a, b 변수가 모두 있어야 한다.
    ```

- interface끼리는 서로 합쳐짐.

  - [playground](https://www.typescriptlang.org/play?#code/ATCWDsBcFMCcDMCGBjawCCwDeBYAUCCIgFzADOksEA5gNz4gC+DYUcSqG2LIARqRSrg6LZgWDIA9uArBJvAFYBGUpgC82YCWAAiABbQANock6ANMH66A7pNiGAJjuCN6eFpACeABzQAhYA0sLQFKGhc3EC9fYACgy1ChagiWKRlIOUUAJlI4zW19IxNzBJs7R2dXVOlZeQUAZlzA-NJC41MIoA)

  - error 두가지
    1. type으로는 같은 이름으로 선언 할 수 없다.
    2. 같은 이름으로 선언된 type은 첫번째 선언된 것으로 타입이 지정된다.

  ```typescript
  interface A {
    a: string;
  }
  interface A {
    b: string;
  }
  const obj1: A = { a: "hello", b: "world" };

  type B = { a: string };
  type B = { b: string };
  const obj2: B = { a: "hello", b: "world" };
  ```

- type, interface 상속

  ```typescript
  type Animal = { breath: true };
  type Mammal = Animal & { breed: true };
  type Human = Mammal & { think: true };

  const man: Human = { breath: true, breed: true, think: true };

  - ⭐️[❗️POINT] type은 이와 같이 사용할 곳에서 사용할 수 있다. 하지만 interface는 불가능
  const man1: Animal & { breed: true; think: true } = {
    breath: true,
    breed: true,
    think: true,
  };

  interface IAnimal {
    breadth: true;
  }
  interface IMammal extends IAnimal {
    breed: true;
  }
  interface IHuman extends IMammal {
    think: true;
  }
  ```

- ⭐️[❗️POINT] interface, type을 섞어서 상속 가능

  ```typescript
  interface IHuman1 extends Mammal {
    think: true;
  }
  type Human1 = IMammal & { think: true };

  const man2: IHuman1 = { breath: true, breed: true, think: true };
  const man3: Human1 = { breath: true, breed: true, think: true };
  ```

- type, interface 상속

  ```typescript
  type Animal = { breath: true };
  type Mammal = Animal & { breed: true };
  type Human = Mammal & { think: true };
  const man: Human = { breath: true, breed: true, think: true };
  ```

- ⭐️[❗️POINT] type은 이와 같이 사용할 곳에서 사용할 수 있다. 하지만 interface는 불가능

  ```typescript
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
  ```

- ⭐️ interface, type을 섞어서 사용 가능

```typescript
interface IHuman1 extends Mammal {
  think: true;
}
type Human1 = IMammal & { think: true };

const man2: IHuman1 = { breath: true, breed: true, think: true };
const man3: Human1 = { breath: true, breed: true, think: true };
```

- ⭐️ [❗️POINT]interface는 선언 할때 마다 합쳐 진다.
  - 이런 특성으로 프로젝트나 lib들이 interface로 선언 되어 있다.
  - 확장 할 수 있기 때문에

```typescript
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
```

- [❗️POINT]interface, type, enum 네이밍 조건

  - Iterface -> IProps, type -> TType, Enum -> EHello 였지만
  - 요즘에는 붙이지 않는 추세라고 함

- 넓은 타입, 좁은 타입

- 객체 리터럴은 잉여 속성 검사가 있음.

```typescript
type A2 = string | number; // 넓은 타입
type A3 = string; // 좁은 타입
type A4 = string & number; //

// - 넓은 타입, 좁은 타입
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

// - 넓은 타입, 좁은 타입을 서로 할당 할 때
// const a7_2: A8 = a5a6_1; // ⭐️ 넓은 타입(a5a6_1)을 좁은 타입(a7_2)으로 할당 할때 에러가 난다.
const a5a6_3: A8 = a7; // ⭐️ 좁은 타입(a7)을 넓은 타입 a5a6_3으로 할당 가능하다

// - 객체 리터럴은 잉여 속성 검사가 있음.
// const a7_3: A8 = { name: "jyoon", age: 34, married: true }; // ⭐️ 잉여 속성 검사 때문에 married 부분에 에러가 난다. , 하지만 a7_4와 같은 과정을 거치면 잉여 속성 검사를 하지 않아 에러가 나지 않는다.
const a7_4 = { name: "jyoon", age: 34, married: true };
const a7_5: A8 = a7_4;
```

```typescript
type A = { hello: string };
const a: A = { hello: "world", why: "error" };

const b = { hello: "world", why: "error" };
const c: A = b;
```

- 3곳에서 사용할 수 있는 void

  - void_1. 함수 void  
    void_2. 매개변수 callback function void  
    void_3. 메서드로 선언할때 void

  - void1, void2: ⭐️ error를 발생하지 않는다.

    - 이유는 return을 사용하지 않겠다 라는 의미

  - void3: ⭐️ error 발생.
    - return 값이 없어야 한다.

```typescript
function a5(callback: () => void /* void_2 */): void /* void_1 */ {
  // return 2; // error, bcz void_1
}

a5(() => 2 /* void_2 */);
interface Human2 {
  talk: () => void /* void_3 */;
}

const human: Human2 = {
  talk() {
    return "abc";
  },
};
```

- void 타입은 return값을 사용하지 안 겠다는 뜻(메서드나 매개변수에서는 리턴값 사용 가능, but 조심해야 함)

```typescript
// declare function forEach<T>(arr: T[], callback: (el: T) => undefined): void; // error: bcz of callback함수읭 return 값이 undefined이다. 하지만 target.push의 반환값은 int값이다.
declare function forEach<T>(arr: T[], callback: (el: T) => void): void;
let target: number[] = [];
forEach([1, 2, 3], (el) => target.push(el));

interface A {
  talk: () => void;
}
const a: A = {
  talk() {
    return 3;
  },
};
```

- 타입만 선언하고 싶을 때 declare(구현은 다른 파일에 있어야 함)

```typescript
declare const a: string;
declare function a(x: number): number;
declare class A {}

// 추후 declare module, declare global, declare namespace도 배움
```

- 타입간 대입 가능 표

  - any: 타입 선언을 포기
  - unknown: 타입을 직접 선언해줘야 한다.
  - 자세히 보면 5개 녹색 부분은 strict 일때 false(x)이다.

    ![image](https://user-images.githubusercontent.com/10962668/179646513-3c3be896-3bbc-4784-848b-06bc47e8b129.png)

- 타입 가드
  - unkonwn, 남이만든 타임이 틀릴때 as를 웬만해서는 쓰지 않는다.

```typescript
function numOrStr(a: number | string) {
  if (typeof a === "string") {
    a.split(",");
  } else {
    a.toFixed(1);
  }
}

function numOrNumArr(a: number | number[]) {
  if (Array.isArray(a)) {
    a.slice(1);
  } else {
    a.toFixed(1);
  }
}

// instanceof
class A9 {
  aaa() {}
}
class B3 {
  bbb() {}
}
function aOrB(param: A9 | B3) {
  if (param instanceof A9) {
    param.aaa();
  }
}
aOrB(new A9());
aOrB(new B3());

// 2가지 방법
//   1. type property,
//   2. in연산자로 객체 안 프로퍼티 구분
type B = { type: "b"; bbb: string };
type C = { type: "c"; ccc: string };
type D = { type: "d"; ddd: string };
type A = B | C | D;
function typeCheck(a: A) {
  // if (a.type === "b") {
  //   a.bbb;
  // } else if (a.type === "c") {
  //   a.ccc;
  // } else {
  //   a.ddd;
  // }
  if ("bbb" in a) {
    a.type;
  } else if ("ccc" in a) {
    a.ddd;
  } else {
    a.ddd;
  }
}
```

- 커스텀 타입 가드(is, 형식 조건자)
  - typeof, instanceof, in, Array.isArray로 구분할 수 있지만
    - 위 4가지 키워드로 구분 할 수 없을 정도로 복잡할 때 사용한다.
  - 그리고 is가 아니면 타입 추론이 안 되는 경우도 있습니다.

```typescript
interface Cat {
  meow: number;
}
interface Dog {
  bow: number;
}
function catOrDog(
  a: Cat | Dog
): a is Dog /* ⭐️ 이게 있어야 조건문에서 분기가 가능하다. */ {
  // 타입 판별을 직접 만들 수 있다.
  if ((a as Cat).meow) {
    return false;
  }
  return true;
}

// 타입을 구분해주는 커스텀 함수를 직접 만들 수 있다.
function pet(pet: Cat | Dog) {
  if (catOrDog(pet)) {
    console.log("pet > dog: ", pet.bow);
  }
  if ("meow" in pet) {
    console.log("pet > cat: ", pet.meow);
  }
}

const cat: Cat | Dog = { meow: 3 };
pet(cat);
```

- 커스텀 타입 가드(is, 형식 조건자)
  - 타입을 더 정확하게 해줄 수 있따.
  - point
    - input is PromiseRejectedResult
    - input is PromiseFulfilledResult<T>

```typescript
const isRejected = (
  input: PromiseSettledResult<unknown>
): input is PromiseRejectedResult /*⭐️ */ => {
  return input.status === "rejected";
};

const isFulfilled = <T>(
  input: PromiseSettledResult<T>
): input is PromiseFulfilledResult<T> /*⭐️ */ => {
  return input.status === "fulfilled";
};

const promises = await Promise.allSettled([
  Promise.resolve("a"),
  Promise.resolve("b"),
]);
const errors = promises.filter(isRejected);
```

- readonly, 인덱스드 시그니처, 맵드 타입스

  - class인 경우 instanceof 연산자도 가능!
  - readonly
  - 인덱스드 시그니처
  - 맵드 타입스
  - interface로는 아래 처럼 |(intersection), &로 표현하지 못한다.

  - readonly

```typescript
// readonly
interface A {
  readonly a: string;
  b: string;
}

// type A = { a: string; b: string; c: string; d: string };
type A11 = { [key: string]: string };
type A12 = { [key: string]: number };
const a8: A11 = { a: "hi", b: "hello", c: "jyoon", d: "world" };
const a9: A12 = { a: 11, b: 11, c: 11, d: 11 };

// 맵드 타입스
type A13 = "Human" | "Mammal" | "Animal";
type A14 = { [key in A13]: number };
const a10: A14 = {
  Human: 11,
  Mammal: 11,
  Animal: 11,
};

type A15 = { [key in A13]: A13 };
const a11: A15 = {
  Human: "Human",
  Mammal: "Mammal",
  Animal: "Animal",
};

// interface로는 아래 처럼 |(intersection), &로 표현하지 못한다.
type A16 = "Human" | "Mammal" | "Animal";
type A17 = "Human" & "Mammal" & "Animal";
```

- class 기초

```typescript
class A18 {
  a: string;
  b: number;
  c?: number;

  /* ⭐️ 기본값이 있을때 는 ? 연산자를 쓰지못한다. */
  constructor(a: string, b: number = 123, c?: number) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  method() {}
}

new A18("1234");

/* ⭐️ */ type A19 = A18;
/* ⭐️ */ const a12: A19 = new A18("1234"); // 클래스 이름은(A19) 인스턴스를 가르킨다.
/* ⭐️ */ const a13: typeof A18 = A18; // typeof A19: class 자체
// /* ⭐️ */ const a13: typeof A18 = new A18("1234"); // error

// ⭐️typescript의 private을 사용하는것이 더 좋다고함
//  (하지만 js로 변환시 public으로 변한다고 한다. 하지만, ts에서 작업할때는 접근이 불가능해 컴파일이 안된다. 즉 사용해도 된다. )
// 이유는 typescript는 protected도 제공해주지만 js에서는 제공하지 않음.
class A20 {
  private a: string; // private: typescript에서 제공
  #b: number;

  constructor(a: string, b: number = 123) {
    this.a = a;
    this.#b = b;
  }

  method() {}
}
```

```typescript
// type A = { a: string; b: string; c: string; d: string };
type A = { [key: string]: string };
const aaa: A = { a: "hi", b: "hello", c: "jyoon", d: "world" };
```

```typescript

```

```typescript

```

- class에 private, protected 추가됨

```typescript
class B implements A {
  private a: string;
  protected b: string;
}
class C extends B {}
new C().a;
new C().b;
```

- 접근 제한자

  - private은 "속한 클래스"에서만 사용 가능
  - protected는 "속한 클래스 + 상속된 클래스"에서 사용 가능
  - public은 "속한 클래스 + 상속된 클래스 + 인스턴스"에서 사용 가능

```typescript
interface A21 {
  a: string;
  b: string;
  c: string;
  d: string;
}
class B6 implements A21 {
  private a: string = "12341";
  protected b: string = "1234";
  public c: string = "wow";
  d: string = "wow";

  method() {
    console.log(this.a);
    console.log(this.b);
    console.log(this.c);
    console.log(this.d);
  }
}
class C2 extends B6 {
  method() {
    // console.log(this.a); // a 접근 제한 됨
    console.log(this.b);
    console.log(this.c);
    console.log(this.d);
  }
}
// console.log("new C2().a: ", new C2().a);
// console.log("new C2().b: ", new C2().b);
console.log("new C2().c: ", new C2().c);
```

- abstract class, abstract method

```typescript
abstract class X {
  abstract work(user: User): boolean;
}
class Y extends X {
  work(user: User): boolean {
    return true;
  }
}
```

- abstract class, abstract 생성자

```typescript
const constructor: abstract new (...args: any) => any = ...
```

- class vs interface

런타임에서 있냐 없냐.

- optional

```typescript
function abc(a: number, b?: number, c: number?) {}
abc(1);
abc(1, 2);
abc(1, 2, 3);

let obj: { a: string; b?: string } = { a: "hello", b: "world" };
obj = { a: "hello" };
```

- 제네릭은 타입에 대한 함수라고 생각하면 됨. 추론을 활용하기

```typescript
function add<T>(x: T, y: T): T {
  return x + y;
}
add<number>(1, 2);
add(1, 2);
add<string>("1", "2");
add("1", "2");
add(1, "2");
```

- 제네릭 선언 위치 기억하기

```typescript
function a<T>() {}
class B<T>() {}
interface C<T> {}
type D<T> = {};
const e = <T>() => {};
```

- 제네릭 기본값, extends

```typescript
function add<T extends string>(x: T, y: T): T {
  return x + y;
}
add(1, 2);
add("1", "2");

// <T extends {...}> // 특정 객체
// <T extends any[]> // 모든 배열
// <T extends (...args: any) => any> // 모든 함수
// <T extends abstract new (...args: any) => any> // 생성자 타입
// <T extends keyof any> // string | number | symbol
```

- 함수에서 공변성과 반공변성 주의!

```typescript
function a(x: string): number {
  return 0;
}
type B = (x: string) => number | string;
let b: B = a;

function a(x: string): number | string {
  return 0;
}
type B = (x: string) => number;
let b: B = a;

function a(x: string | number): number {
  return 0;
}
type B = (x: string) => number;
let b: B = a;

function a(x: string): number {
  return 0;
}
type B = (x: string | number) => number;
let b: B = a;
```

- 함수 오버로딩

```typescript
function add(x: number, y: number): number;
function add(x: string, y: string): string;
function add(x: any, y: any) {
  return x + y;
}

interface Add {
  (x: number, y: number): number;
  (x: string, y: string): string;
}
const add: Add = (x: any, y: any) => x + y;
```

- infer는 타입 내에서 추론된 값으로 다시 새로운 타입을 만드는 것(밑에 utility types 참고).
- 타입스크립트는 건망증이 심하다

```typescript
try {
  await axios.get();
} catch (err) {
  console.error(err.response?.data);
}
```

- this 타이핑

```typescript
function (this: Window, a: number, b: number) {
  console.log(this);
}
```

## utility types로 알아보기

[링크](https://www.typescriptlang.org/docs/handbook/utility-types.html)

- Partial

```typescript
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

- Required

```typescript
type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

- ReadOnly

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

- Pick

```typescript
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

- Record

```typescript
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

- Exclude

```typescript
type Exclude<T, U> = T extends U ? never : T;
```

- Extract

```typescript
type Extract<T, U> = T extends U ? T : never;
```

- Omit

```typescript
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

- NonNullable

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;
```

- Parameters

```typescript
type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;
```

- ConstructorParameters

```typescript
type ConstructorParameters<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: infer P) => any ? P : never;
```

- ReturnType

```typescript
type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;
```

- InstanceType

```typescript
type InstanceType<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: any) => infer R ? R : any;
```

- 기타

```typescript
/**
 * Convert string literal type to uppercase
 */
type Uppercase<S extends string> = intrinsic;

/**
 * Convert string literal type to lowercase
 */
type Lowercase<S extends string> = intrinsic;

/**
 * Convert first character of string literal type to uppercase
 */
type Capitalize<S extends string> = intrinsic;

/**
 * Convert first character of string literal type to lowercase
 */
type Uncapitalize<S extends string> = intrinsic;

function applyStringMapping(symbol: Symbol, str: string) {
  switch (intrinsicTypeKinds.get(symbol.escapedName as string)) {
    case IntrinsicTypeKind.Uppercase:
      return str.toUpperCase();
    case IntrinsicTypeKind.Lowercase:
      return str.toLowerCase();
    case IntrinsicTypeKind.Capitalize:
      return str.charAt(0).toUpperCase() + str.slice(1);
    case IntrinsicTypeKind.Uncapitalize:
      return str.charAt(0).toLowerCase() + str.slice(1);
  }
  return str;
}

/**
 * Marker for contextual 'this' type
 */
interface ThisType<T> {}
```

# ts 라이브러리 분석

- package.json의 types 속성에 적힌 파일이 메인 타이핑 파일임.
- npmjs.com에서 패키지를 검색했을 때 패키지 우측에 TS로 뜨면 ts 지원 라이브러리이고, DT로 뜨면 @types를 설치해야 하며, 그것마저도 없으면 직접 타이핑해야 함
- 첫 번째 줄부터 보기 보다는 마지막 줄 exports default나 export = 부분을 보고 거슬러 올라가는 게 좋음
- 제네릭이 제일 읽기 어려워서 제네릭 부분은 따로 필기하면서 보는게 좋음

## 모듈 시스템

```typescript
export = A; // commonjs
import A = require("a"); // commonjs

export = A;
export as namespace A; // UMD

export default A; // ESM
import A from "a"; // ESM
```

```typescript
declare global {}
export {}; // export나 import 필요
```

## jQuery의 타이핑

```typescript
$("p").removeClass("myClass noClass").addClass("yourClass");
$(["p", "t"]).text("hello");
const tag = $("ul li").addClass(function (index) {
  return "item-" + index;
});
$(tag).html(function (i: number) {
  console.log(this);
  return $(this).data("name") + "입니다";
});
```

```typescript
export = jQuery;

declare const jQuery: JQueryStatic;
declare const $: JQueryStatic;

interface JQueryStatic {
  <TElement extends HTMLElement = HTMLElement>(
    html: JQuery.htmlString,
    ownerDocument_attributes?: Document | JQuery.PlainObject
  ): JQuery<TElement>;
  <TElement extends Element = HTMLElement>(
    selector: JQuery.Selector,
    context?: Element | Document | JQuery | JQuery.Selector
  ): JQuery<TElement>;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  addClass(
    className_function:
      | JQuery.TypeOrArray<string>
      | ((this: TElement, index: number, currentClassName: string) => string)
  ): this;
  removeClass(
    className_function?:
      | JQuery.TypeOrArray<string>
      | ((this: TElement, index: number, className: string) => string)
  ): this;
  on<TType extends string>(
    events: TType,
    handler:
      | JQuery.TypeEventHandler<TElement, undefined, TElement, TElement, TType>
      | false
  ): this;
}
```

## axios의 타이핑

index.d.ts

```typescript
declare const axios: AxiosStatic;
export default axios;

export interface AxiosStatic extends AxiosInstance {
  create(config?: CreateAxiosDefaults): AxiosInstance;
  Cancel: CancelStatic;
  CancelToken: CancelTokenStatic;
  Axios: typeof Axios;
  AxiosError: typeof AxiosError;
  readonly VERSION: string;
  isCancel(value: any): value is Cancel;
  all<T>(values: Array<T | Promise<T>>): Promise<T[]>;
  spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R;
  isAxiosError<T = any, D = any>(payload: any): payload is AxiosError<T, D>;
  toFormData(
    sourceObj: object,
    targetFormData?: GenericFormData,
    options?: FormSerializerOptions
  ): GenericFormData;
  formToJSON(form: GenericFormData | GenericHTMLFormElement): object;
}

export interface AxiosInstance extends Axios {
  <T = any, R = AxiosResponse<T>, D = any>(
    config: AxiosRequestConfig<D>
  ): AxiosPromise<R>;
  <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): AxiosPromise<R>;

  defaults: Omit<AxiosDefaults, "headers"> & {
    headers: HeadersDefaults & {
      [key: string]: AxiosHeaderValue;
    };
  };
}

export class Axios {
  constructor(config?: AxiosRequestConfig);
  defaults: AxiosDefaults;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
  getUri(config?: AxiosRequestConfig): string;
  request<T = any, R = AxiosResponse<T>, D = any>(
    config: AxiosRequestConfig<D>
  ): Promise<R>;
  get<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  delete<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  head<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  options<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  post<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  put<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  patch<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  postForm<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  putForm<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  patchForm<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
}

export interface AxiosResponse<T = any, D = any> {
  data: T;
  status: number;
  statusText: string;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  config: AxiosRequestConfig<D>;
  request?: any;
}
```

## react의 타이핑

[소스 링크](https://github.com/ZeroCho/ts-react/tree/master/2.%EB%81%9D%EB%A7%90%EC%9E%87%EA%B8%B0)

export = React; declare namespace React, declare global, namespace JSX

```typescript
import React = require("react");
import * as React from "react";
React.useEffect;
```

return에 무엇이 들어갈 수 있을까? JSX, string, null?

```typescript
function App(): JSX.Element {
  ...
}

const App: FC<{}> = () => <div />;

interface Element extends React.ReactElement<any, any> { }

interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: Key | null;
}

type JSXElementConstructor<P> =
        | ((props: P) => ReactElement<any, any> | null)
        | (new (props: P) => Component<any, any>);

class Component<P, S> {
  render(): ReactNode;
}

interface FunctionComponent<P = {}> {
//    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null; // React17
    (props: P, context?: any): ReactElement<any, any> | null;
    propTypes?: WeakValidationMap<P> | undefined;
    contextTypes?: ValidationMap<any> | undefined;
    defaultProps?: Partial<P> | undefined;
    displayName?: string | undefined;
}

type ReactText = string | number;
type ReactChild = ReactElement | ReactText;
type ReactFragment = {} | Iterable<ReactNode>;
type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
interface ReactPortal extends ReactElement {
    key: Key | null;
    children: ReactNode;
}

type FC<P = {}> = FunctionComponent<P>;

interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
    propTypes?: WeakValidationMap<P> | undefined;
    contextTypes?: ValidationMap<any> | undefined;
    defaultProps?: Partial<P> | undefined;
    displayName?: string | undefined;
}

type VFC<P = {}> = VoidFunctionComponent<P>;

interface VoidFunctionComponent<P = {}> {
    (props: P, context?: any): ReactElement<any, any> | null;
    propTypes?: WeakValidationMap<P> | undefined;
    contextTypes?: ValidationMap<any> | undefined;
    defaultProps?: Partial<P> | undefined;
    displayName?: string | undefined;
}
```

훅 타이핑

```typescript
function useState<S>(
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>];
function useState<S = undefined>(): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>>
];

type SetStateAction<S> = S | ((prevState: S) => S);
type Dispatch<A> = (value: A) => void;

function useRef<T>(initialValue: T): MutableRefObject<T>;
function useRef<T>(initialValue: T | null): RefObject<T>;
function useRef<T = undefined>(): MutableRefObject<T | undefined>;

interface MutableRefObject<T> {
  current: T;
}
interface RefObject<T> {
  readonly current: T | null;
}

function useLayoutEffect(effect: EffectCallback, deps?: DependencyList): void;
function useEffect(effect: EffectCallback, deps?: DependencyList): void;

type EffectCallback = () => void | Destructor;
type DependencyList = ReadonlyArray<unknown>;
type Destructor = () => void | { [UNDEFINED_VOID_ONLY]: never };

function useCallback<T extends Function>(callback: T, deps: DependencyList): T;
function useMemo<T>(factory: () => T, deps: DependencyList | undefined): T;
```

tsconfig.json "jsx": "react"로

```typescript
import * as React from "react";
import { useState, useCallback, useRef } from "react";

const WordRelay = () => {
  const [word, setWord] = useState("제로초");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputEl = useRef(null);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      const input = inputEl.current;
      if (word[word.length - 1] === value[0]) {
        setResult("딩동댕");
        setWord(value);
        setValue("");
        if (input) {
          input.focus();
        }
      } else {
        setResult("땡");
        setValue("");
        if (input) {
          input.focus();
        }
      }
    },
    [word, value]
  );

  const onChange = useCallback((e) => {
    setValue(e.currentTarget.value);
  }, []);

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputEl} value={value} onChange={onChange} />
        <button>입력!</button>
      </form>
      <div>{result}</div>
    </>
  );
};

export default WordRelay;
```

## redux의 타이핑

```typescript

```

```typescript
export interface Dispatch<A extends Action = AnyAction> {
  <T extends A>(action: T, ...extraArgs: any[]): T;
}

export interface Action<T = any> {
  type: T;
}

export interface AnyAction extends Action {
  // Allows any extra properties to be defined in an action.
  [extraProps: string]: any;
}

export interface ActionCreator<A, P extends any[] = any[]> {
  (...args: P): A;
}

export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S;

export interface MiddlewareAPI<D extends Dispatch = Dispatch, S = any> {
  dispatch: D;
  getState(): S;
}

export interface Middleware<
  _DispatchExt = {}, // TODO: remove unused component (breaking change)
  S = any,
  D extends Dispatch = Dispatch
> {
  (api: MiddlewareAPI<D, S>): (
    next: D
  ) => (action: D extends Dispatch<infer A> ? A : never) => any;
}
```

## react-redux의 타이핑

```typescript
export const useSelector = /*#__PURE__*/ createSelectorHook();

export function createSelectorHook(
  context = ReactReduxContext
): <TState = unknown, Selected = unknown>(
  selector: (state: TState) => Selected,
  equalityFn?: EqualityFn<Selected>
) => Selected {}

export const useDispatch = /*#__PURE__*/ createDispatchHook();

export function createDispatchHook<
  S = unknown,
  A extends Action = AnyAction
  // @ts-ignore
>(context?: Context<ReactReduxContextValue<S, A>> = ReactReduxContext) {
  const useStore =
    // @ts-ignore
    context === ReactReduxContext ? useDefaultStore : createStoreHook(context);

  return function useDispatch<
    AppDispatch extends Dispatch<A> = Dispatch<A>
  >(): AppDispatch {
    const store = useStore();
    // @ts-ignore
    return store.dispatch;
  };
}
```

[Provider 소스 링크](https://github.com/ZeroCho/ts-react/blob/master/react-redux-immer/client.tsx)
[훅 소스 링크](https://github.com/ZeroCho/ts-react/blob/master/react-redux-immer/App.tsx)

## Node의 타이핑

<reference path="..."은 해당 파일의 타입들을 끌고 오는 것. 요즘 할 필요 없음
d.ts 파일에 declare module 'fs:promises'로 import 'fs:promises' 할 때 어떤 타입이 될 지 작성할 수 있음.

```typescript
function createServer(requestListener?: RequestListener): Server;
type RequestListener = (req: IncomingMessage, res: ServerResponse) => void;
```

```typescript
function readFile(
  path: PathLike | number,
  options: { encoding?: null; flag?: string } | undefined | null,
  callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void
): void;

function readFile(
  path: PathLike | FileHandle,
  options?: { encoding?: null; flag?: string | number } | null
): Promise<Buffer>;

type PathLike = string | Buffer | URL;

function join(...paths: string[]): string;
```

## Express의 타이핑

```typescript
export = e;
declare function e(): core.Express;
declare namespace e {
  var json: typeof bodyParser.json;
  var urlencoded: typeof bodyParser.urlencoded;
}

interface RequestHandler<
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = core.Query,
  Locals extends Record<string, any> = Record<string, any>
> extends core.RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> {}

import * as core from "express-serve-static-core";
```

타입 확장을 위한 장치

```typescript
// This extracts the core definitions from express to prevent a circular dependency between express and serve-static
declare global {
  namespace Express {
    // These open interfaces may be extended in an application-specific manner via declaration merging.
    // See for example method-override.d.ts (https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/method-override/index.d.ts)
    interface Request {}
    interface Response {}
    interface Application {}
  }
}

export interface Request<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = ParsedQs,
  Locals extends Record<string, any> = Record<string, any>
> extends http.IncomingMessage,
    Express.Request {}

import { ParsedQs } from "qs";

export {};

export type Query = ParsedQs;

export interface ParamsDictionary {
  [key: string]: string;
}
export interface RequestHandler<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = ParsedQs,
  Locals extends Record<string, any> = Record<string, any>
> {
  // tslint:disable-next-line callable-types (This is extended from and can't extend from a type alias in ts<2.2)
  (
    req: Request<P, ResBody, ReqBody, ReqQuery, Locals>,
    res: Response<ResBody, Locals>,
    next: NextFunction
  ): void;
}

export interface NextFunction {
  (err?: any): void;
  /**
   * "Break-out" of a router by calling {next('router')};
   * @see {https://expressjs.com/en/guide/using-middleware.html#middleware.router}
   */
  (deferToNext: "router"): void;
  /**
   * "Break-out" of a route by calling {next('route')};
   * @see {https://expressjs.com/en/guide/using-middleware.html#middleware.application}
   */
  (deferToNext: "route"): void;
}

export interface Express extends Application {
  request: Request;
  response: Response;
}

export interface Application<
  Locals extends Record<string, any> = Record<string, any>
> extends EventEmitter,
    IRouter,
    Express.Application {
  use: ApplicationRequestHandler<this>;
}

export type ApplicationRequestHandler<T> = IRouterHandler<T> &
  IRouterMatcher<T> &
  ((...handlers: RequestHandlerParams[]) => T);

export type RequestHandlerParams<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = ParsedQs,
  Locals extends Record<string, any> = Record<string, any>
> =
  | RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>
  | ErrorRequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>
  | Array<RequestHandler<P> | ErrorRequestHandler<P>>;
```

passport 타이핑

```typescript
declare global {
  namespace Express {
    // tslint:disable-next-line:no-empty-interface
    interface AuthInfo {}
    // tslint:disable-next-line:no-empty-interface
    interface User {}

    interface Request {
      authInfo?: AuthInfo | undefined;
      user?: User | undefined;

      // These declarations are merged into express's Request type
      login(user: User, done: (err: any) => void): void;
      login(user: User, options: any, done: (err: any) => void): void;
      logIn(user: User, done: (err: any) => void): void;
      logIn(user: User, options: any, done: (err: any) => void): void;

      logout(
        options: { keepSessionInfo?: boolean },
        done: (err: any) => void
      ): void;
      logout(done: (err: any) => void): void;
      logOut(
        options: { keepSessionInfo?: boolean },
        done: (err: any) => void
      ): void;
      logOut(done: (err: any) => void): void;

      isAuthenticated(): this is AuthenticatedRequest;
      isUnauthenticated(): this is UnauthenticatedRequest;
    }

    interface AuthenticatedRequest extends Request {
      user: User;
    }

    interface UnauthenticatedRequest extends Request {
      user?: undefined;
    }
  }
}
```

passport-local 타이핑

```typescript
import { Strategy as PassportStrategy } from "passport-strategy";
import express = require("express");

interface IStrategyOptions {
  usernameField?: string | undefined;
  passwordField?: string | undefined;
  session?: boolean | undefined;
  passReqToCallback?: false | undefined;
}

interface IStrategyOptionsWithRequest {
  usernameField?: string | undefined;
  passwordField?: string | undefined;
  session?: boolean | undefined;
  passReqToCallback: true;
}

interface IVerifyOptions {
  message: string;
}

interface VerifyFunctionWithRequest {
  (
    req: express.Request,
    username: string,
    password: string,
    done: (error: any, user?: any, options?: IVerifyOptions) => void
  ): void;
}

interface VerifyFunction {
  (
    username: string,
    password: string,
    done: (error: any, user?: any, options?: IVerifyOptions) => void
  ): void;
}

declare class Strategy extends PassportStrategy {
  constructor(
    options: IStrategyOptionsWithRequest,
    verify: VerifyFunctionWithRequest
  );
  constructor(options: IStrategyOptions, verify: VerifyFunction);
  constructor(verify: VerifyFunction);

  name: string;
}
```
