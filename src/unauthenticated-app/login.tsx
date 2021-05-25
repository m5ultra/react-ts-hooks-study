import React, { FormEvent } from "react";
import { useAuth } from "../context/auth-content";
import { Button, Form, Input } from "antd";

export const LoginScreen = () => {
  const { user, login } = useAuth();

  // HTMLFormElement extends Element
  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   // event.preventDefault();
  //   const username = (event.currentTarget.elements[0] as HTMLInputElement)
  //     .value;
  //   const password = (event.currentTarget.elements[1] as HTMLInputElement)
  //     .value;
  //   login({ username, password });
  // };
  const handleSubmit = (value: { username: string, password: string }) => {
    login(value);
  };
  return (
    <Form onFinish={handleSubmit}>
      {
        user ? <div>当前登陆用户名：{user.name}</div> : null
      }
      <Form.Item name={"username"} label={"用户名"} htmlFor={"username"} rules={[{ required: true, message: "请输入用户名" }]}>
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item name={"password"} label={"密码"} htmlFor={"password"} rules={[{ required: true, message: "请输入密码" }]}>
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <Button type={"primary"} htmlType={"submit"}>登录</Button>
      </Form.Item>
    </Form>
  );
};
