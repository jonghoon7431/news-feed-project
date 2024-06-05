
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/createpost/Form';
import Input from '../components/createpost/Input';
import ImageUpload from '../components/createpost/ImageUpload';
import HashTag from '../components/createpost/HashTag';
import supabase from '../supabaseClient';
import Top from '../components/createpost/Top';

function CreatePost() {
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState([]);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [userEmail, setUserEmail] = useState('')
  const [titleError, setTitleError] = useState('')
  const [contentError, setContentError] = useState('')

  const hashTagRef = useRef(null);
  const titleErrorRef = useRef('제목을 입력해주세요')
  const contentErrorRef = useRef('내용을 입력해주세요')

  useEffect(() => {
    const fetchUserData = async () => {
      const {data : {user}} = await supabase.auth.getUser()
      if(user) {
        setUserEmail(user.email)
      }
    }
    fetchUserData()
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;
    if (!title.trim()) {
      setTitleError(titleErrorRef.current)
      hasError = true
    } else {
      setTitleError('')
    }

    if (!content.trim()) {
      setContentError(contentErrorRef.current)
      hasError = true
    } else {
      setContentError('')
    }

    if (hasError) {
      return 
    }

    const uploadedImageUrls = [];

    for (let image of images) {
      const fileExt = image.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: storageError } = await supabase.storage
        .from('images')
        .upload(filePath, image);

      if (storageError) {
        alert('잘못된 접근입니다')
        return;
      } else {
        const { data, error: urlError } = supabase
          .storage
          .from('images')
          .getPublicUrl(filePath);

        if (urlError) {
          alert('잘못된 접근입니다')
          return;
        }
        uploadedImageUrls.push(data.publicUrl);
      }
    }

    const { error } = await supabase
      .from('POSTS')
      .insert([
        { name : userEmail, title, content, tag , image_url: uploadedImageUrls }
      ]);

    if (error) {
      alert('잘못된 접근입니다')
    } else {
      alert('저장이 완료되었습니다 !');
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
        <Top navigate={navigate}/>
        <Input name={userEmail} setName={setName} title={title} setTitle={setTitle} content={content} setContent={setContent} titleError={titleError} contentError={contentError} />
        <ImageUpload handleImageChange={handleImageChange} previews={previews} />
        <HashTag hashTagRef={hashTagRef} showHashTag={showHashTag} tag={tag} />
      </Form>
    </div>
  );
}

export default CreatePost
