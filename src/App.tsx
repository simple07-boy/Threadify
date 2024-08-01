import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import { Home } from './pages/Home'
import { Checkout } from './pages/Checkout'
import Header from './Components/Header'
import singleItem from './pages/singleItem'
const App = () => {
  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' Component={Home} />
      <Route path='/checkout' Component={Checkout} />
      <Route path='/product/:id' Component={singleItem} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App