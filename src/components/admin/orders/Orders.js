import React, { useContext } from 'react';
import { OrdersContext, ProductsContext, UsersContext } from '../AdminDashborad';
import {Link} from 'react-router-dom';

function Orders() {
  const {orders, dispatch} = useContext(OrdersContext);
  const {users} = useContext(UsersContext);
  const {products} = useContext(ProductsContext);

  const user = (id) => {
    const user = users.data.find(({_id }) => _id === id)
    return user.name;
  }

  const product = (id) => {
    const product = products.data.find(({_id }) => _id === id)
    return product.name;
  }

  return (
    <>
      <div className="btn-group">
        <Link className="btn btn-primary" to={`/orders/add`} >Add Order</Link>
      </div>
      {orders.loading ? '' : 
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>User</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Suptotal</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              orders.data.map((order ,index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{user(order.user_id)}</td>
                  <td>{product(order.product_id)}</td>
                  <td>{order.quantity}</td>
                  <td>{order.subtotal}</td>
                  <td>
                    <Link className='btn btn-outline-primary' ><i className='fa fa-pencil'></i></Link>
                    <Link className='btn btn-outline-warning' ><i className='fa fa-eye'></i></Link>
                    <button type="button" className="btn btn-outline-danger"><i className='fa fa-trash'></i></button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      }
    </>
  );
}

export default Orders;
