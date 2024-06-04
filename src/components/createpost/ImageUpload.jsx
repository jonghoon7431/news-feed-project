import React from 'react'

const ImageUpload = ({handleImageChange, previews}) => {
  return (
    <section className='mx-4 my-4'>
      <label htmlFor="image-upload" className='cursor-pointer'>이미지 업로드</label>
      <input className='hidden' id='image-upload' type="file" accept='image/*' multiple onChange={handleImageChange}/>
      <div className='mt-6 flex flex-row flex-wrap'>
        {previews.map((preview, index) => (
          <img key={index} src={preview} alt={`preview-${index}`} className='w-28 m-2.5'/>
        ))}
      </div>
    </section>
  )
}

export default ImageUpload