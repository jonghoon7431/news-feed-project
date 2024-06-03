import React, { useRef, useState } from 'react';
import supabase from '../../supabaseClient';
import './createpost.css';
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
      <form onSubmit={handleSubmit} className='flex-column'>
        <div style={{ height: '40px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Btn style={{ margin: '10px 20px 0' }} type='button' onClick={() => navigate('/')}>뒤로가기</Btn>
          <Btn style={{ margin: '10px 20px 0 0' }} type='submit'>저장</Btn>
        </div>
        <input style={{ padding: '15px', fontSize: '18px', margin: '10px 0' }} type="text" placeholder='작성자 이름' value={name} onChange={(e) => setName(e.target.value)} />
        <input className='' style={{ padding: '15px', fontSize: '18px', margin: '0 0 10px' }} type="text" placeholder='제목' value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea className='mb-10' style={{ resize: 'none', width: '100%', height: '300px', padding: '15px', fontSize: '16px', margin: '0 0 10px' }} placeholder='내용' value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        <input type="file" accept='image/*' multiple onChange={handleImageChange} />
        <HashTagWrap className='mb-10'>
          <input className='mr-10' ref={hashTagRef} style={{ width: '30%', padding: '10px' }} type="text" placeholder='#해시태그' />
          <TagBtn className='mr-10' type='button' onClick={showHashTag}>태그 등록</TagBtn>
        </HashTagWrap>
        <div>
          <ul className='flex-row'>
            {tag.map((item, index) => (
              <li className='mr-5' style={{ margin: '10px 5px' }} key={index}><TagSpan>{item}</TagSpan></li>
            ))}
          </ul>
        </div>
        <div>
          {previews.map((preview, index) => (
            <img key={index} src={preview} alt={`preview-${index}`} style={{ width: '100px', margin: '10px' }} />
          ))}
        </div>
      </form>
    </div>
  );
}

export default Form;
