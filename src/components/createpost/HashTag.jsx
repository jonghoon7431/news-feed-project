import React from 'react'

const HashTag = ({hashTagRef, showHashTag, tag}) => {
  return (
    <section>
      <div className='flex flex-row items-center justify-end mr-2.5'>
        <input className='w-4/12 p-2.5' ref={hashTagRef} type="text" placeholder='#해시태그' />
        <button className='ml-2.5' type='button' onClick={showHashTag}>태그 등록</button>
      </div>
      <div>
        <ul className='flex-row'>
          {tag.map((item, index) => (
            <li className='my-2.5 mx-1.5'key={index}><span className='py-1.5 px-2.5'>{item}</span></li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default HashTag