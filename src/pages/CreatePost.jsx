import React from 'react';
import Form from '../components/createpost/Form';
import { useNavigate } from 'react-router-dom';


function CreatePost() {
  const navigate = useNavigate()
  return (
    <div>
      <Form navigate={navigate}/>
    </div>
  );
}

export default CreatePost;
