import React, { FormEvent } from 'react'
import { Button, Form, Input } from 'antd'
import { useAuth } from '../context/auth-content'
import { LongButton } from './index'

const apiUrl = process.env.REACT_APP_API_URL

export const RegisterScreen = ({ onError }: { onError: (err: Error) => void }) => {
  const { user, register } = useAuth()

  // HTMLFormElement extends Element
  const handleSubmit = ({ c_password, ...values }: { username: string; password: string; c_password: string }) => {
    if (c_password !== values.password) {
      onError(new Error('请确认两次输入的密码是否相同'))
    }
    register(values).catch((e) => {
      onError(e)
    })
  }

  return (
    <Form onFinish={handleSubmit}>
      {user ? <div>当前登陆用户名：{user.name}</div> : null}
      <Form.Item name={'username'} htmlFor={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
        <Input placeholder={'用户名'} type="text" id={'username'} />
      </Form.Item>
      <Form.Item name={'password'} htmlFor={'password'} rules={[{ required: true, message: '请输入密码' }]}>
        <Input placeholder={'密码'} type="password" id={'password'} />
      </Form.Item>
      <Form.Item name={'c_password'} htmlFor={'c_password'} rules={[{ required: true, message: '请确认密码' }]}>
        <Input placeholder={'密码'} type="password" id={'c_password'} />
      </Form.Item>
      <Form.Item>
        <LongButton type={'primary'} htmlType={'submit'}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  )
}
