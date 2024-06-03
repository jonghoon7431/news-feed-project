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
      setTag('')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='flex-column' >
        <div style={{height:'40px', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
          <button className='' style={{margin:'10px 20px 0'}}  type='button'>뒤로가기</button>
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
        <input className='' style={{width:'30%', padding:'10px'}}  type="text"  placeholder='#해시태그' value={tag} onChange={(e) => {
          setTag(e.target.value)
        }} />
        <button className=''  type='button'>태그 등록</button>
      </form>
    </div>
  )
}

export default Form