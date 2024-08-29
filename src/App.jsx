import { useState } from 'react'
import Dashboard from './components/Dashboard';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h2 style={{ textAlign: 'center', marginTop: '0px' }}>Social Media Dashboard</h2>
        <Dashboard />
      </div>
    </>
  )
}

export default App
