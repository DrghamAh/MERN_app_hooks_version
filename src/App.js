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

function App() {
  return (
    <div className="">
      <Router>
        <Header />
        <div className='container'>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/categories">
            <Categories />
          </Route>
          <Route exact path="/categories/:id" component={Category_details} />
          <Route exact path="/categories/add">
            <AddCategory />
          </Route>
          <Route exact path="/categories/update/:id" >
            <EditCategory />
          </Route>
          <Route exact path="/products">
            <ProductList /> 
          </Route>
          <Route exact path="/products/add">
            <AddProduct />
          </Route>
          <Route exact path="/products/update/:id">
            <EditProduct />
          </Route>
          <Route exact path="/products/:id">
            <Product_Details />
          </Route>
          <Route exact path="/users" component={Users} />
          <Route exact path="/users/add" component={AddUser} />
          <Route exact path="/users/edit/:id" component={EditUser} />
        </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
