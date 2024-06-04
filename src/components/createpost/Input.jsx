import React from 'react'

const Input = ({name, setName, title, setTitle, content, setContent}) => {
  return (
    <section className='flex flex-col'>
      <input className='p-4 text-lg mt-2.5' type="text" placeholder='작성자 이름' value={name} onChange={(e) => setName(e.target.value)} />
      <input className='p-4 text-lg mb-2.5' type="text" placeholder='제목' value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea className='p-4 mb-2.5 resize-none w-full h-80 mb-2.5' placeholder='내용' value={content} onChange={(e) => setContent(e.target.value)}></textarea>
    </section>
  )
}

export default Input