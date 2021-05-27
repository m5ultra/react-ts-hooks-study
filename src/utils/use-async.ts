import { useState } from 'react'

interface IState<D> {
  error: Error | null
  data: D | null
  stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultState: IState<null> = {
  stat: 'idle',
  data: null,
  error: null,
}
const defaultConf = {
  throwOnError: false,
}
export const useAsync = <D>(initialState?: IState<D>, initialConf?: typeof defaultConf) => {
  const conf = { ...defaultConf, ...initialConf }
  const [state, setState] = useState<IState<D>>({ ...defaultState, ...initialState })
  const setData = (data: D) =>
    setState({
      data,
      stat: 'success',
      error: null,
    })

  const setError = (error: Error) =>
    setState({
      data: null,
      stat: 'error',
      error,
    })

  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error('请传入 Promise 类型数据')
    }

    setState({
      ...state,
      stat: 'loading',
    })

    return promise
      .then((data) => {
        setData(data)
        return data
      })
      .catch((error) => {
        setError(error)
        if (conf.throwOnError) return Promise.reject(error)
        return error
      })
  }
  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    ...state,
  }
}
