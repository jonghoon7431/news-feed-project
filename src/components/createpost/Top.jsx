import React from 'react'

const Top = ({navigate}) => {
  return (
    <header className='flex justify-between h-16 px-3 py-5 items-center '>
      <button className='p-2.5 rounded-lg ml-2.5' type='button' onClick={() => navigate('/')}>뒤로가기</button>
      <button className='p-2.5 rounded-lg mr-2.5' type='submit'>저장</button>      
    </header>
  )
}

export default Top