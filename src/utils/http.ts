import qs from "qs";
import * as auth from "../auth-provider";
import { useAuth } from "../context/auth-content";

const apiUrl = process.env.REACT_APP_API_URL;

interface IConfig extends RequestInit {
  token?: string,
  data?: object
}

// 给一个参数加默认值就变为默认可选了
export const http = (endpoint: string, { data, token, headers, ...customConfig }: IConfig = {}) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : ""
    },
    ...customConfig
  };
  if (config.method.toUpperCase() === "GET") {
    //某些场景需要判断是否有问号 暂时不考虑
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ msg: "请重新登陆" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};
// JS 中的typeof 是在runtime时运行的
// return typeof 1 === 'number'

// TS中的 typeof 是在静态环境运行
// return (...[endpoint, config]: Parameters<typeof Http>) =>

// utility type的用法： 用泛型给他传入一个其他类型, 然后 utility type对这个类型就行某种操作

export const useHttp = () => {
  const { user } = useAuth();
  // 学习操作符号
  return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token });
};

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

