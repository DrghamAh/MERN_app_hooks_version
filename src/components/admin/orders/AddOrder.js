import React, { useContext, useState } from 'react';
import { ProductsContext, UsersContext } from '../AdminDashborad';

function AddOrder() {
  const {users} = useContext(UsersContext);
  const {products} = useContext(ProductsContext);

  const [order, setOrder] = useState({
    user_id : '',
    product_id : '',
    quantity : 0 || '',
    subtotal : 0 || '',
  });

  const [product, setProduct] = useState({
    _id : '',
    name : '',
    price : 0,
    quantity : 0,
    category_id : '',
  });

  const handleInputChange = (e) => {
    switch (e.target.name) {
      case "user_id" : setOrder({...order, user_id : e.target.value}); break;
      case "product_id" :
        setOrder({...order, product_id : e.target.value});
        const new_product = products.data.find(({_id}) => _id === e.target.value);
        setProduct(new_product);
        break;

      default : setOrder({...order});
    }
  }

  const handleProductChange = (e) => {
    e.preventDefault();
    const product = products.data.find(({_id}) => _id === e.target.value);
    setOrder({...order, product_id : e.target.value});
    setProduct(product);
  }

  const handleQuantityChange = (e) => {
    e.preventDefault();
    setOrder({...order, quantity : e.target.value, subtotal : product.price * e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <form onSubmit={handleSubmit} >
        <div className="form-group">
          <label htmlFor='user_id'>User</label>
          <select className="form-control" name="user_id" onChange={handleInputChange}>
            <option value="">Select</option>
            {users.data.map((user, index) => (
              <option value={user._id} key={index}>{user.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor='product_id'>Product</label>
          <select className="form-control" name="product_id" onChange={handleProductChange}>
            <option value="">Select</option>
            {products.data.map((product, index) => (
              <option value={product._id} key={index}>{product.name}</option>
            ))}
          </select>
        </div>
        <div id='box'></div>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    </>
  );
}

export default AddOrder;
