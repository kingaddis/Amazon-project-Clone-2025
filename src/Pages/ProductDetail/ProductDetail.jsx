import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LayOut from '../../Componets/LayOut/LayOut';
import ProductCard from '../../Componets/Product/ProductCard';

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // optional loading flag

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${productId}`)
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
       
      </LayOut>
    );
  }


  return (
    <LayOut>
      <ProductCard product={product} />
    </LayOut>
  );
}

export default ProductDetail;
