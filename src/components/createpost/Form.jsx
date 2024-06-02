import React, { useEffect, useState } from 'react'
import supabase from '../../supabaseClient';
import './createpost.css'

function Form() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState([]);

  const handleSubmit = async(e) => {
    e.preventDefault()

    // 데이터 삽입 처리
    const { data, error } = await supabase
      .from('POSTS')
      .insert([
        { name, title, content, tag }
      ])

    if (error) {
      console.error('Error inserting data:', error)
    } else {
      console.log('Data inserted:', data)
      alert('Post added successfully!')
      // 폼 초기화
      setName('')
      setTitle('')
      setContent('')
      setTag('')
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('POSTS').select('*');

      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    };
    fetchData();
  }, []);
  return (
    <div style={{maxWidth: '800px', backgroundColor : 'black'}}>
      <form onSubmit={handleSubmit} className='flex-column'>
        <input className='w-100' type="text" placeholder='작성자 이름' value={name} onChange={(e) => {
          setName(e.target.value)
        }} />
        <input className='w-100' type="text" placeholder='제목' value={title} onChange={(e) => {
          setTitle(e.target.value)
        }}/>
        <textarea className='w-100' placeholder='내용' value={content} onChange={(e) => {
          setContent(e.target.value)
        }}></textarea>
        <input type="text" className='w-100' placeholder='#해시태그' value={tag} onChange={(e) => {
          setTag(e.target.value)
        }} />
        <button type='button'>태그 등록</button>
        <button type='submit'>저장</button>
      </form>
    </div>
  )
}

export default Form