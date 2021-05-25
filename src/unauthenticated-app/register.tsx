import React, { FormEvent } from "react";
import { Button, Form, Input } from "antd";
import { useAuth } from "../context/auth-content";

const apiUrl = process.env.REACT_APP_API_URL;

export const RegisterScreen = () => {
  const { user, register } = useAuth();

  // HTMLFormElement extends Element
  const handleSubmit = (values: { username: string, password: string }) => {
    register(values);
  };

  return (
    <Form onFinish={handleSubmit}>

      {
        user ? <div>当前登陆用户名：{user.name}</div> : null
      }
      <Form.Item name={"username"} htmlFor={"username"} rules={[{ required: true, message: "请输入用户名" }]}>
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item name={"password"} htmlFor={"password"} rules={[{ required: true, message: "请输入密码" }]}>
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <Button type={"primary"} htmlType={"submit"}>注册</Button>
      </Form.Item>
    </Form>
  );
};
