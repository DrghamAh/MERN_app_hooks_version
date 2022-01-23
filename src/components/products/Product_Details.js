import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom';

function Product_Details() {
  const [id, setId] = useState(useParams().id)
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/products/${id}`).then(response => {
      setProduct(response.data);
    })
  }, [])

  return (
    <div className='container'>
      <div className='card p-5'>
        <h1>Name : <span>{product.name}</span></h1>
        <p>Price : ${product.price}</p>
        <p>Quantity : {product.quantity}</p>
        <Link className='btn btn-primary' to={`/products/update/${id}`} >Edit</Link>
      </div>
    </div>
  )
}

export default Product_Details
