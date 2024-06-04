import React from 'react'

const Header = ({navigate}) => {
  return (
    <header className='h10 flex items-center justify-between mt-2.5'>
      <button className='p-2.5 rounded-lg ml-2.5' type='button' onClick={() => navigate('/')}>뒤로가기</button>
      <button className='p-2.5 rounded-lg mr-2.5' type='submit'>저장</button>
    </header>
  )
}

export default Header