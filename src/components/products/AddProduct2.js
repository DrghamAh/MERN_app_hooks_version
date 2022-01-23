import React, {useEffect, useReducer, useState} from 'react'

const initialState = {
  product : {
    name : '',
    price : Number,
    quantity : Number,
    category_id : '',
  },
  errors : [],
}

const reducer = (currentState, action) => {
  switch (action.type) {
    case action.type === 'LOADING' : return {
      
    }
  }
}

function AddProduct2() {
  const [state, dispatch] = useReducer(initialState, reducer);
  const [categories, setCategories] = useState([]);

  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor='price'>Name:</label>
          <input type='text' className='form-control' name="name" />
          <span className="text-danger"></span>
        </div>
        <div className="form-group">
          <label htmlFor='price'>Price:</label>
          <input type='text' className='form-control' name="price" />
          <span className="text-danger"></span>
        </div>
        <div className="form-group">
          <label htmlFor='quantity'>Quantity:</label>
          <input type='text' className='form-control' name="quantity" />
          <span className="text-danger"></span>
        </div>
        <div className="form-group">
          <label htmlFor='category_id'>Category:</label>
          <input type='text' className='form-control' name="category_id" />
          <span className="text-danger"></span>
        </div>
        <buttton type="submit" className="btn btn-primary">Add</buttton>
      </form>
    </div>
  )
}

export default AddProduct2
