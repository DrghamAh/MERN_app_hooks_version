import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AddProduct from './components/products/AddProduct';
import Home from './components/Home';
import Header from './components/layouts/Header';
import ProductList from './components/products/ProductList';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import Categories from './components/categories/Categories';
import AddCategory from './components/categories/AddCategory';
import EditProduct from './components/products/EditProduct';
import EditCategory from './components/categories/EditCategory';
import Product_Details from './components/products/Product_Details';
import Category_details from './components/categories/Category_details';
import Users from './components/users/Users';
import AddUser from './components/users/AddUser';
import EditUser from './components/users/EditUser';
import React, { useReducer, useEffect } from 'react';
import axios from 'axios';

export const CategoriesContext = React.createContext();
export const ProductsContext = React.createContext();

const categoriesInitialState = {
  data : [],
  loading : true,
  error : '',
}

const productsInitialState = {
  data : [],
  loading : true,
  error : '',
}

const categoriesReducer = (currentState, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS" : 
      return {
        data : action.payload,
        loading : false,
        error : '',
      }
    case "FETCH_FAILED" : 
      return {
        data : [],
        loading : false,
        error : action.payload,
      }
    case "FETCH_LOADING" :
      return {
        data : [],
        loading : true,
        error : '',
      }
    default : return currentState;
  }
}

const productsReducer = (currentState, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS" :
      return {
        data : action.payload,
        loading : false,
        error : '',
      }
    case "FETCH_FAILED" :
      return {
        data : [],
        loading : false,
        error : '',
      }
    case "FETCH_LOADING" :
      return {
        data : [],
        loading : true,
        error : '',
      }
    case "MODIFICATION_SUCCESS" :
      return {
        data : action.payload,
        loading : false,
        error : '',
      }
    case "MODIFICATION_FAILED" :
      return {
        data : currentState.data,
        loading: false,
        error : action.payload,
      }
    default : return currentState;
  }
}

function App() {
  const [categories, dispatchCategories] = useReducer(categoriesReducer, categoriesInitialState);
  const [products, dispatchProducts] = useReducer(productsReducer, productsInitialState);

  useEffect(() => {
    async function fetchData() {
      dispatchCategories({type : 'FETCH_LOADING'});
      try {
        const result = await axios.get('http://localhost:5000/categories');
        console.log(result);
        dispatchCategories({type : 'FETCH_SUCCESS', payload : result.data})
      } catch(err) {
        dispatchCategories({type : 'FETCH_FAILED', payload : err});
      }

      dispatchProducts({type : 'FETCH_LOADING'});
      try {
        const result = await axios.get('http://localhost:5000/products');
        console.log(result);
        dispatchProducts({type : 'FETCH_SUCCESS', payload : result.data});
      } catch (err) {
        dispatchProducts({type : 'FETCH_FAILED', payload : err});
      }
    }

    fetchData();
  }, [])

  return (
    <>
      <CategoriesContext.Provider value={{categories, dispatch : dispatchCategories}}>
      <ProductsContext.Provider value={{products, dispatch : dispatchProducts}} >
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
        </Switch>
        </div>
      </Router>
      </ProductsContext.Provider>
      </CategoriesContext.Provider>
      
    </>
  );
}

export default App;
