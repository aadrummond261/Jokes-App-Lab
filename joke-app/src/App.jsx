import React, { useState, useEffect } from 'react'
import './App.css'

const App = () => {
  const [joke, setJoke] = useState(null)
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)

  const fetchJoke = async () => {
    setLoading(true)

    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke')
      const data = await response.json()
      setJoke(data)
      setCount(prev => prev + 1)
    } catch (error) {
      console.error('Error fetching joke:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJoke()
  }, [])

  return (
    <div className="app">
      <h1>😂 Joke App 🎉</h1>

      <p className="counter">🔥 Jokes seen: {count}</p>

      <button onClick={fetchJoke} disabled={loading}>
        🤣 Get a Joke
      </button>

      {loading && <p className="loading">⏳ Loading joke...</p>}

      {joke && !loading && (
        <div className="joke-card">
          <p className="setup">😏 {joke.setup}</p>
          <p className="punchline">😂 {joke.punchline}</p>
        </div>
      )}
    </div>
  )
}

export default App