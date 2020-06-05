import React from 'react'
import ReactDOM from 'react-dom'

import './style.css'

import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Main from './components/Main'

function App() {
  return (
    <div className='container'>
      <div className="row">
        <Header />
      </div>
      <div className="row">
        <Sidebar />
        <Main />
      </div>
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById('root'))