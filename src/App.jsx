import { useState } from 'react'
import LeaderboardComponent from './Leaderboard'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LeaderboardComponent/>

      
    </>
  )
}

export default App
