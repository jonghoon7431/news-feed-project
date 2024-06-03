import React, { useEffect, useState } from 'react'
import supabase from '../../supabaseClient';
import './createpost.css'

function Form() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');

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

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <input type="text" placeholder='작성자 이름' value={name} onChange={(e) => {
          setName(e.target.value)
        }} />
        <input  type="text" placeholder='제목' value={title} onChange={(e) => {
          setTitle(e.target.value)
        }}/>
        <textarea  placeholder='내용' value={content} onChange={(e) => {
          setContent(e.target.value)
        }}></textarea>
        <input type="text"  placeholder='#해시태그' value={tag} onChange={(e) => {
          setTag(e.target.value)
        }} />
        <button type='button'>태그 등록</button>
        <button type='submit'>저장</button>
      </form>
    </div>
  )
}

export default Form