import React, { Fragment, useState } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

function UploadImage() {
  const [image, setImage] = useState('');
  const [imageName, setImageName] = useState('Choose File');

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    setImageName(e.target.files[0].name);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('imageName', imageName);
    try {
      const response = await axios.post('http://localhost:5000/images', formData, {
        headers : {
          'Content-type' : 'multipart/form-data',
        }
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Fragment>
      <div className="container">
        <h1 className="text-center my-4">
          <i className="fab fa-react"></i>
          React Upload File
        </h1>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group custom-file">
            <input type="file" name="image" className="custom-file-input" id="customFile" onChange={handleFileChange}/>
            <label htmlFor='customFile' className='custom-file-label d-block'>{imageName}</label>
          </div>
          <button type="submit" className='btn btn-primary d-block my-4'>Submit</button>
        </form>
      </div>
    </Fragment>
  )
}

export default UploadImage
