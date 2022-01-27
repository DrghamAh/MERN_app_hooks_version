import React, { useState } from 'react'

function UploadImage() {
  // const [image, setImage] = useState()

  const handleFormSubmit = (e) => {
    console.log(e);
  }

  return (
    <div>
      <form encType='multipart/form-data' onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input type="file" name="image" className="form-control"/>
        </div>
        <input type='text' name='name' className='form-control' />
        <button type="submit" className='btn btn-primary'>Submit</button>
      </form>
    </div>
  )
}

export default UploadImage
