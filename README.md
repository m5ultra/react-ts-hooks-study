# 用 Custom Hook 提取并重用代码

React 团队从一开始就很注重 React 代码的复用性，他们对 React 代码复用性的解决方案历经了
这几个阶段：

```
Mixin -> HOC -> Render Prop -> Custom Hook
```

**Custom Hook 是其中最新也是最优秀的方案 ✅**

我们已经认识过了 `useState` 和 `useEffect` 两个最基本的 React 自带 Hook，
本节我们将会 写出 `useMount` 和 `useDebounce` 两个 Custom Hook，体会它是怎么像函数一样提取组件逻辑的

最后会给大家设置一个思考题 🤔



// TS Utility Types

// 联合类型
let myFavoriteNumber: string | number;
myFavoriteNumber = 7;
myFavoriteNumber = "seven";
// TS2322: Type '{}' is not assignable to type 'string | number'.   Type '{}' is not assignable to type 'number'.
// myFavoriteNumber = {}

let jackFavoriteNumber: string | number;
// 类型别名
type FavoriteNumber = string | number

let roseFavoriteNumber: FavoriteNumber = "6";

// interface Person {
//   name: string
// }

type Person = { name: string }

const xiaoMing: Person = { name: "xiaoming" };

// 类型别名在很多情况下可以和interface互换

// 区别：联合类型 和 交叉类型无法 interface 无法替代type
// interface 也无法实现 Utility Type

type Person2 = {
name: string,
age: number
}

type Person3 = {}
// Person2可以把某个类型中的类型变为可选类型
const xiaoMing2: Partial<Person2> = { name: "xiaoming" };

// Omit<类型1, 某个属性> 从类型1中去除某个属性 可以一次去除多个

const shenMiRen: Omit<Person2, "name"> = { age: 88 };
const shenMiRen2: Omit<Person2, "name" | "age"> = { age: 88, name: "Dendi", gender: "0" };

const P3: Person3 = { name: "Dendi" }
type PersonKeys = keyof Person2
type PersonOnlyName = Pick<Person2, "name">

// Partial 的实现
type Partial<T> = {
[P in keyof T]?: T[P]
}

// Pick 实现
// K extends keyof T：  keyof T 会返回T中所有类型的联合类型 extends 关键字约束K 继承 keyof T的联合类型

type Pick<T, K extends keyof T> = {
[P in K]: T[P];
}

// Omit
// type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

// type Exclude<T, U> = T extends U ? never : T;
