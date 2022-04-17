import React, { useCallback, useEffect, useState } from 'react'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const useSimplified = (): [
  () => Promise<void>,
  { loading: boolean; data: any }
] => {
  const [state, setState] = useState<{ loading: boolean; data: any }>({
    loading: false,
    data: undefined,
  })

  const fetch = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }))

    await sleep(1000)

    setState((prev) => ({ ...prev, loading: false, data: [1, 2, 3] }))
  }, [])

  return [fetch, state]
}

export default function App() {
  const [rows, setRows] = useState<number[]>([])

  const [fetch, { data, loading }] = useSimplified()

  useEffect(() => {
    console.log('fetch')
    fetch()
  }, [fetch])

  useEffect(() => {
    console.log('in use, loading: ', loading)
    if (data) {
      console.log('has data')
      setRows([...data])
    }
  }, [data, loading])

  console.log(loading)
  console.log(data)
  console.log(rows)

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button>Click</button>
      {loading ? (
        <div data-testid="loading">Loading...</div>
      ) : (
        rows.map((value, index) => (
          <React.Fragment key={index}>{value}</React.Fragment>
        ))
      )}
    </div>
  )
}
