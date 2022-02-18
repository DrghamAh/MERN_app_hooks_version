import axios from "axios";
import React, {useState, useEffect} from "react";

const Home = () => {
  const [products, setProducts] = useState(0);
  const [categories, setCategories] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/categories').then(response => {
      setCategories(response.data.length);
    }).catch(err => {
      console.log(err);
    });
    axios.get('http://localhost:5000/products').then(response => {
      setProducts(response.data.length);
    }).catch(err => {
      console.log(err);
    })
  }, [])

  return (
    <>
      <div className="home">
        <div className="row">
          <div className="col-4">
            <div className="card text-primary bordered border-primary m-2 p-2">
              <h1 className="text-lg-center">Products {products}</h1>
            </div>
          </div>
          <div className="col-4">
            <div className="card text-primary bordered border-primary m-2 p-2">
              <h1 className="text-lg-center">Categories {categories}</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;