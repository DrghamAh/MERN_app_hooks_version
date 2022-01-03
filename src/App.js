import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AddProduct from './components/AddProduct';
import Home from './components/Home';
import Header from './components/layouts/Header';
import ProductList from './components/ProductList';
import 'bootstrap/dist/css/bootstrap.min.css';
import Categories from './components/Categories';
import AddCategory from './components/AddCategory';
import EditProduct from './components/EditProduct';

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
          <Route exact path="/products">
            <ProductList /> 
          </Route>
          <Route exact path="/products/add">
            <AddProduct />
          </Route>
          <Route exact path="/categories">
            <Categories />
          </Route>
          <Route exact path="/categories/add">
            <AddCategory />
          </Route>
          <Route exact path="/product/update/:id">
            <EditProduct />
          </Route>
        </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
