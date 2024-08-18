import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './Components/layout'
import Homepage from './Pages/homepage'
import Loginpage from './Pages/loginpage'
import Registerpage from './Pages/registerpage'
import { UserContextProvider } from './Context/usercontext'
import Postpage from './Pages/postpage'
import createpostpage from './Pages/createpostpage'
import Createpostpage from './Pages/createpostpage'

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path={`/login`} element={<Loginpage />} />
          <Route path={`/register`} element={<Registerpage />} />
          <Route path={'/create'} element={<Postpage />} />
          <Route path={'/post/:id'} element={<Createpostpage />} />
        </Route>
      </Routes>
    </UserContextProvider>

  )
}

export default App
