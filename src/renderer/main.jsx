import React from 'react'
import { createRoot } from 'react-dom/client'
import MiniFootball from './mini-football.jsx'

function App() {
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'100vh'}}>
      <div style={{background:'#fff',borderRadius:'18px',padding:'8px'}}>
        <MiniFootball />
      </div>
    </div>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
