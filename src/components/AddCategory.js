import axios from 'axios';
import React from 'react';

const AddCategory = () => {
  return (
    <form className="form-inline" onSubmit={this.handleFormSubmit}>
      <div className='form-group'>
        <label htmlFor='name'>Category name : </label>
        <input type="text" name='name' className='form-control' value={this.state.name} onChange={this.handleNameChange}/>
      </div>
      <button type="submit" className='btn btn-primary'>Add</button>
    </form>
  );
}

export default AddCategory;