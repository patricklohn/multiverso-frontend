import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>
        <h1>Teste</h1>
        <iframe src="/venda-carro-form/index.html"></iframe>
      </div>
    </>
  )
}

export default App
