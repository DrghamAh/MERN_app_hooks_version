import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import AddProduct from './products/AddProduct';
import Home from './Home';
import Header from './layouts/Header';
import ProductList from './products/ProductList';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import Categories from './categories/Categories';
import AddCategory from './categories/AddCategory';
import EditProduct from './products/EditProduct';
import EditCategory from './categories/EditCategory';
import Product_Details from './products/Product_Details';
import Category_details from './categories/Category_details';
import Users from './users/Users';
import AddUser from './users/AddUser';
import EditUser from './users/EditUser';
import React, { useState, useReducer, useEffect } from 'react';
import axios from 'axios';
import Orders from './orders/Orders';
import AddOrder from './orders/AddOrder';
import SignUp from './auth/SignUp';
import Login from './auth/Login';

import categoriesInitialState from '../states/CategoriesState';
import productsInitialState from '../states/ProductsState';
import usersInitialState from '../states/UsersState';
import ordersInitialState from '../states/OrdersState';
import CategoriesReducer from '../reduers/CategoriesReducer';
import ProductsReducer from '../reduers/ProductsReducer';
import UsersReducer from '../reduers/UsersReducers';
import OrdersReducer from '../reduers/OrdersReducer';

export const CategoriesContext = React.createContext();
export const ProductsContext = React.createContext();
export const UsersContext = React.createContext();
export const OrdersContext = React.createContext();

function AdminDashborad() {
  const [categories, dispatchCategories] = useReducer(CategoriesReducer, categoriesInitialState);
  const [products, dispatchProducts] = useReducer(ProductsReducer, productsInitialState);
  const [users, dispatchUsers] = useReducer(UsersReducer, usersInitialState);
  const [orders, dispatchOrders] = useReducer(OrdersReducer, ordersInitialState);

  const [userInfo] = useState(JSON.parse(localStorage.getItem('user_info')));

  useEffect(() => {
    async function fetchData(token) {
      const config = {
        headers : {
          'Content-type' : 'application/json',
          'token' : token,
        }
      }

      dispatchCategories({type : 'FETCH_LOADING'});
      dispatchProducts({type : 'FETCH_LOADING'});
      dispatchUsers({type : 'FETCH_LOADING'});
      dispatchOrders({type : 'FETCH_LOADING'});      
      try {
        const result = await axios.get('http://localhost:5000/categories', config);
        console.log(result);
        dispatchCategories({type : 'FETCH_SUCCESS', payload : result.data})
      } catch(err) {
        dispatchCategories({type : 'FETCH_FAILED', payload : err});
      }

      try {
        const result = await axios.get('http://localhost:5000/products', config);
        console.log(result);
        dispatchProducts({type : 'FETCH_SUCCESS', payload : result.data});
      } catch (err) {
        dispatchProducts({type : 'FETCH_FAILED', payload : err});
      }

      try {
        const result = await axios.get('http://localhost:5000/users', config);
        console.log(result);
        dispatchUsers({type : 'FETCH_SUCCESS', payload : result.data});
      } catch (error) {
        dispatchUsers({type : 'FETCH_FAILED', payload : error});
      }


      try {
        const result = await axios.get('http://localhost:5000/orders', config);
        console.log(result);
        dispatchOrders({type : "FETCH_SUCCESS", payload : result.data});
      } catch (error) {
        dispatchOrders({type : "FETCH_FAILED", payload : error});
      }
    }

    if (userInfo) {
      fetchData(userInfo);
    }
  }, [userInfo])
  
  if (!userInfo) {
    return (
      <>
        <Router>
          <Header />
          <Switch>
            <div className='container'>
              <Route exact path={`/`}>
                <h1>You are not logged in!</h1>
                <Link to={`/login`}>Login</Link>
              </Route>
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
            </div>
          </Switch>
        </Router>
      </>
    )
  }

  return (
    <>
      
      <CategoriesContext.Provider value={{categories, dispatch : dispatchCategories}}>
      <ProductsContext.Provider value={{products, dispatch : dispatchProducts}} >
      <UsersContext.Provider value={{users, dispatch : dispatchUsers}}>
      <OrdersContext.Provider value={{orders, dispatch : dispatchOrders}}>
      <Router>
        <Header />
        <div className='container'>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/categories" >
            <Categories />
          </Route>
          <Route exact path="/categories/add" component={AddCategory} />
          <Route exact path="/categories/:id" component={Category_details} />
          <Route exact path="/categories/update/:id" component={EditCategory} />
          <Route exact path="/products" >
            <ProductList />
          </Route>
          <Route exact path="/products/add" >
            <AddProduct />
          </Route>
          <Route exact path="/products/update/:id" component={EditProduct} />
          <Route exact path="/products/:id" component={Product_Details} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/users/add" component={AddUser} />
          <Route exact path="/users/edit/:id" component={EditUser} />
          <Route exact path="/orders" component={Orders} />
          <Route exact path="/orders/add" component={AddOrder} />
          
        </Switch>
        </div>
      </Router>
      </OrdersContext.Provider>
      </UsersContext.Provider>
      </ProductsContext.Provider>
      </CategoriesContext.Provider>
      
    </>
  );

}


export default AdminDashborad;
