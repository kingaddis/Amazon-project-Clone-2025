
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LayOut from '../../Components/LayOut/LayOut';
import ProductCard from '../../Components/Product/ProductCard';
import Loader from '../../Components/Loader/Loader';
import ProductUrl from '../../API/APIENDPOINT';
// API/ENDPOINT FOR URL 
function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${ProductUrl}/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching product:', err);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return (
      <LayOut>
        <Loader />
      </LayOut>
    );
  }

  return (
    <LayOut>
      <ProductCard 
        product={product} 
        flex={(true)} 
        renderDesc={true}
        renderAdd={true}/>
        
     
    </LayOut>
  );
}

export default ProductDetail;
