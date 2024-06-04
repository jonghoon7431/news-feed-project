import React from 'react'
import './placeholder.css'
const Input = ({name, setName, title, setTitle, content, setContent, titleError, contentError }) => {
  return (
    <section className='flex flex-col'>
      <input className='p-4 text-lg my-2.5' type="text" placeholder='작성자 이름' value={name} onChange={(e) => setName(e.target.value)} readOnly/>
      <input className={`p-4 text-lg mb-2.5 ${titleError ? 'border-red-500 placeholder-red-500' : ''}`} type="text" placeholder={`${titleError ? titleError : '제목'}`} value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea className={`p-4 mb-2.5 resize-none w-full h-80 mb-2.5 ${contentError ? 'border-red-500 placeholder-red-500' : ''}`} placeholder={`${contentError ? contentError : '내용'}`} value={content} onChange={(e) => setContent(e.target.value)}></textarea>
    </section>
  )
}

export default Input