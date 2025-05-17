import { useState } from 'react'
import Header from './Componets/Header/Header'
import CarouselEffect  from './Componets/Carousel/CarouselEffect'
import Catagory from './Componets/Catagory/Catagory.jsx'
import Product from './Componets/Product/Product.jsx'

// import reactLogo from './assets/react.svg'

// import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
        <Header/>
        <CarouselEffect/>
        <Catagory/>
        <Product/>
    </>
  )
}

export default App
