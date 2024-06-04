import React, { useRef, useState } from 'react';
import supabase from '../../supabaseClient';
import { HashTagWrap, Btn, TagBtn, TagSpan } from './StyledComponent';

function Form({ navigate }) {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState([]);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const hashTagRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadedImageUrls = [];

    for (let image of images) {
      const fileExt = image.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: storageError } = await supabase.storage
        .from('images')
        .upload(filePath, image);

      if (storageError) {
        console.error('Error uploading image:', storageError);
        return;
      } else {
        const { data, error: urlError } = supabase
          .storage
          .from('images')
          .getPublicUrl(filePath);

        if (urlError) {
          console.error('Error getting public URL:', urlError);
          return;
        }

        uploadedImageUrls.push(data.publicUrl);
      }
    }

    const { data, error } = await supabase
      .from('POSTS')
      .insert([
        { name, title, content, tag, image_url: uploadedImageUrls }
      ]);

    if (error) {
      console.error('Error inserting data:', error);
    } else {
      console.log('Data inserted:', data);
      alert('Post added successfully!');
      navigate('/')
      setName('');
      setTitle('');
      setContent('');
      setTag([]);
      setImages([]);
      setPreviews([]);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...images, ...files];
    setImages(newImages);

    const newPreviews = newImages.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const showHashTag = () => {
    const hashTag = hashTagRef.current.value.trim();
    if (hashTag !== '') {
      setTag([...tag, hashTag]);
      hashTagRef.current.value = '';
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <div className='h10 flex items-center justify-between mt-2.5'>
          <Btn className='p-2.5 rounded-lg ml-2.5' type='button' onClick={() => navigate('/')}>뒤로가기</Btn>
          <Btn className='p-2.5 rounded-lg mr-2.5' type='submit'>저장</Btn>
        </div>
          <input className='p-4 text-lg mt-2.5' type="text" placeholder='작성자 이름' value={name} onChange={(e) => setName(e.target.value)} />
          <input className='p-4 text-lg mb-2.5' type="text" placeholder='제목' value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea className='p-4 mb-2.5 resize-none w-full h-80 mb-2.5' placeholder='내용' value={content} onChange={(e) => setContent(e.target.value)}></textarea>
          <div className='mx-4 my-4'>
            <label htmlFor="image-upload" className='cursor-pointer'>이미지 업로드</label>
            <input className='hidden' id='image-upload' type="file" accept='image/*' multiple onChange={handleImageChange}/>
            <div className='mt-6 flex flex-row flex-wrap'>
                {previews.map((preview, index) => (
                  <img key={index} src={preview} alt={`preview-${index}`} className='w-28 m-2.5'/>
                ))}
            </div>
          </div>
          <div className='flex flex-row items-center justify-end mr-2.5'>
            <input className='w-4/12 p-2.5' ref={hashTagRef} type="text" placeholder='#해시태그' />
            <Btn className='ml-2.5' type='button' onClick={showHashTag}>태그 등록</Btn>
          </div>
        <div>
          <ul className='flex-row'>
            {tag.map((item, index) => (
              <li className='my-2.5 mx-1.5'key={index}><span className='py-1.5 px-2.5'>{item}</span></li>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
}

export default Form;
