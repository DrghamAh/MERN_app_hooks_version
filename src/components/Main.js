import React, { useEffect, useReducer } from 'react';
import Header from './layouts/Header';
import './Main.css';
import axios from 'axios';

import categoriesInitialState from './states/CategoriesState';
import productsInitialState from './states/ProductsState';
import ProductsReducer from './reduers/ProductsReducer';
import CategoriesReducer from './reduers/CategoriesReducer';


function Main() {
  const [categories, dispatchCategories] = useReducer(CategoriesReducer, categoriesInitialState);
  const [products, dispatchProducts] = useReducer(ProductsReducer, productsInitialState);

  useEffect(() => {
    const fetchData = () => {
      dispatchCategories({type : 'FETCH_LOADING'});
      dispatchProducts({type : 'FETCH_LOADING'});

      try {
        const response = axios.get('http://localhost:5000/categories', {
          headers : {
            'Content-type' : 'application/json',
          }
        });

        if (response) {
          dispatchCategories({type : 'FETCH_SUCCESS', payload : response.data});
        } else {
          dispatchCategories({type : "FETCH_FAILED", payload : 'Something went wrong'});
        }
      } catch (error) {
        dispatchCategories({type : 'FETCH_FAILED', payload : error});
      }

      try {
        const response = axios.get('http://localhost:5000/products',{
          headers : {
            'Content-type' : 'application/json',
          },
        });
        if (response) {
          dispatchProducts({type : 'FETCH_SUCCESS', payload : response.data});
        } else {
          dispatchProducts({type : 'FETCH_FAILED', payload : 'Something went wrong'});
        }
      } catch (error) {
        dispatchProducts({type : "FETCH_FAILED", payload : 'error'});
      }
    }
    fetchData();
  });

  return (
    <>
      <Header />
      <div className="container">
        <section className="section" id="categoies-section">
          <div className="section-title">
            <h1>Categories</h1>
          </div>
          <div className="flex">
            <div className="card">
              <div className="card-header">
                <img src="images/laptop-1.png" />
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <img src="images/headphone-2.png" />
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <img src="images/smartphone-1.png" />
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="products-section">
          <div className="section-title">
            <h1>Products</h1>
          </div>
          <div className="flex">
            <div className="card">
              <div className="card-header">
                <img src="images/smartphone-1.png" />
              </div>
              <div className="card-body">
                <p>$ 0.00</p>
                <h2>Product Name</h2>
                <div className="rating">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star-half"></i>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <img src="images/smartphone-1.png" />
              </div>
              <div className="card-body">
                <p>$ 0.00</p>
                <h2>Product Name</h2>
                <div className="rating">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star-half"></i>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <img src="images/smartphone-1.png" />
              </div>
              <div className="card-body">
                <p>$ 0.00</p>
                <h2>Product Name</h2>
                <div className="rating">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star-half"></i>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Main;
