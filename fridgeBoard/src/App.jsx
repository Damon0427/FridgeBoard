import { useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import CurrentMate from './Components/CurrentMate.jsx'    
function App() {
  return (
    <>
    <div className="Home"> 
      <h1 className = 'title'> Space Ship</h1>
      <div className='container'>
        <span>Add Some cool Cat into the ship!</span>
        <button className="add-button">
          <Link to="/add" className="button-link"> Add </Link>
        </button>
        <hr />
        <h2 className='current-mate'>Current Mate:</h2>
        <div>
          <CurrentMate />
        </div>
      </div>
    </div>
    </>
  )
}

export default App
