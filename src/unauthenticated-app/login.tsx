import React from 'react'
import { useAuth } from '../context/auth-content'
import { Form, Input } from 'antd'
import { LongButton } from './index'
import { useAsync } from '../utils/use-async'

export const LoginScreen = ({ onError }: { onError: (error: Error | null) => void }) => {
  const { user, login } = useAuth()
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })
  const handleSubmit = async (value: { username: string; password: string }) => {
    try {
      await run(login(value))
    } catch (e) {
      onError(e)
    }
  }
  const handleInputChange = (event: any) => {
    onError(null)
  }
  return (
    <Form onFinish={handleSubmit} labelAlign={'left'}>
      {user ? <div>当前登陆用户名：{user.name}</div> : null}
      <Form.Item name={'username'} htmlFor={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
        <Input onChange={handleInputChange} placeholder={'用户名'} type="text" id={'username'} />
      </Form.Item>
      <Form.Item name={'password'} htmlFor={'password'} rules={[{ required: true, message: '请输入密码' }]}>
        <Input placeholder={'密码'} type="password" id={'password'} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} type={'primary'} htmlType={'submit'}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  )
}
