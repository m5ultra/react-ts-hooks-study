import React, { FormEvent } from 'react'
import { useAuth } from '../context/auth-content'
import { Button, Form, Input } from 'antd'
import { LongButton } from './index'

export const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const { user, login } = useAuth()

  // HTMLFormElement extends Element
  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   // event.preventDefault();
  //   const username = (event.currentTarget.elements[0] as HTMLInputElement)
  //     .value;
  //   const password = (event.currentTarget.elements[1] as HTMLInputElement)
  //     .value;
  //   login({ username, password });
  // };
  const handleSubmit = (value: { username: string; password: string }) => {
    try {
      login(value)
    } catch (e) {
      onError(e)
    }
  }
  return (
    <Form onFinish={handleSubmit} labelAlign={'left'}>
      {user ? <div>当前登陆用户名：{user.name}</div> : null}
      <Form.Item name={'username'} htmlFor={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
        <Input placeholder={'用户名'} type="text" id={'username'} />
      </Form.Item>
      <Form.Item name={'password'} htmlFor={'password'} rules={[{ required: true, message: '请输入密码' }]}>
        <Input placeholder={'密码'} type="password" id={'password'} />
      </Form.Item>
      <Form.Item>
        <LongButton type={'primary'} htmlType={'submit'}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  )
}
