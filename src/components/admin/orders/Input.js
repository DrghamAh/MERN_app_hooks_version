import React from 'react';

function Input(props) {
  return (
    <div className='form-group'>
      <label htmlFor={props.name} >{props.name.upperCase()}</label>
      <input type="text" className='form-control' value={props.value} onChange={props.onChange} />
      <span className='text-danger' >{props.error}</span>
    </div>
  );
}

export default Input;
