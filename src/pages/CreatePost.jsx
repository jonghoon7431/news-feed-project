import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/createpost/Form';
import Header from '../components/createpost/Header';
import Input from '../components/createpost/Input';
import ImageUpload from '../components/createpost/ImageUpload';
import HashTag from '../components/createpost/HashTag';
import supabase from '../supabaseClient';

function CreatePost() {
  const navigate = useNavigate()
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
      <Form handleSubmit={handleSubmit}>
        <Header navigate={navigate} />
        <Input name={name} setName={setName} title={title} setTitle={setTitle} content={content} setContent={setContent} />
        <ImageUpload handleImageChange={handleImageChange} previews={previews} />
        <HashTag hashTagRef={hashTagRef} showHashTag={showHashTag} tag={tag} />
      </Form>
    </div>
  );
}

export default CreatePost;
