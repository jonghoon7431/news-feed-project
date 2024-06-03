import React, { useEffect, useRef, useState } from 'react'
import supabase from '../../supabaseClient';
import './createpost.css'

function Form({navigate}) {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState([]);
  const hashTagRef = useRef(null)

  const handleSubmit = async(e) => {
    e.preventDefault()
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
      setName('')
      setTitle('')
      setContent('')
      setTag([])
    }
  }
  const showHashTag = () => {
    const hashTag = hashTagRef.current.value.trim()
    if(hashTag !== '') {
      setTag([...tag, hashTag])
      hashTagRef.current.value = ''
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className='flex-column' >
        <div style={{height:'40px', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
          <button className='' style={{margin:'10px 20px 0'}}  type='button' onClick={() => {
            navigate('/')
          }}>뒤로가기</button>
          <button className='' style={{margin:'10px 20px 0 0'}}  type='submit'>저장</button>
        </div>
        <input style={{padding : '15px', fontSize:'18px', margin:'10px 0'}} type="text" placeholder='작성자 이름' value={name} onChange={(e) => {
          setName(e.target.value)
        }} />
        <input className='' style={{padding : '15px', fontSize:'18px', margin:'0 0 10px'}}  type="text" placeholder='제목' value={title} onChange={(e) => {
          setTitle(e.target.value)
        }}/>
        <textarea className=''  style={{resize:'none', width:'100%', height:'300px', padding:'15px', fontSize:'16px', margin :'0 0 10px'}} placeholder='내용' value={content} onChange={(e) => {
          setContent(e.target.value)
        }}></textarea>
        <input className='' ref={hashTagRef} style={{width:'30%', padding:'10px'}}  type="text"  placeholder='#해시태그'/>
        <button className='' type='button' onClick={showHashTag} >태그 등록</button>
        <ul>
          {
            tag.map((item, index) => (
              <li key={index}>{item}</li>
            ))
          }
        </ul>
      </form>
    </div>
  )
}

export default Form