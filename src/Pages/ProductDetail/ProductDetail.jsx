// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import LayOut from '../../Componets/LayOut/LayOut';
// import ProductCard from '../../Componets/Product/ProductCard';
// import Landing from '../Landing/Landing';
// import Loader from '../../Componets/Loader/Loader';

// function ProductDetail() {
//   const { productId } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true); // optional loading flag

//   useEffect(() => {
//     axios
//       .get(`https://fakestoreapi.com/products/${productId}`)
//       .then((res) => {
//         setProduct(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('Error fetching product:', err);
//         setLoading(false);
//       });
//   }, [productId]);

//   if (loading) {
//     return (
//       <LayOut>
//        <div>loading...</div>
//       </LayOut>
//     );
//   }


//   return (
//     <LayOut>
//       <ProductCard product={product} />
//     </LayOut>
//   );
// }

// export default ProductDetail;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LayOut from '../../Componets/LayOut/LayOut';
import ProductCard from '../../Componets/Product/ProductCard';
import Loader from '../../Componets/Loader/Loader';

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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
        <Loader />
      </LayOut>
    );
  }

  return (
    <LayOut>
      <ProductCard product={product} flex={(true)} renderDesc={true}/>
     
    </LayOut>
  );
}

export default ProductDetail;
