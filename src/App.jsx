import { useState } from 'react'
import './App.css'
import Header from './modules/Header'
import Tabla from './modules/Tablaformulario'
import Footer from './modules/Footer'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     {/* <Header/> */}
     <Tabla/>
     <Footer/>
    </>
  )
}

export default App
