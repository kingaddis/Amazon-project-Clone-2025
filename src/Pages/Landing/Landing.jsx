import React from 'react'
import LayOut from '../../Componets/LayOut/LayOut'
import Carousel from '../../Componets/Carousel/CarouselEffect'
import Catagory from '../../Componets/Catagory/Catagory'
import Product from '../../Componets/Product/Product'

function Landing() {
  return (
    <LayOut>
        
      <Carousel/>
      <Catagory/>
      <Product/>


    </LayOut>
  )
}

export default Landing