import React from 'react'

const Form= ({ children, handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit} className='flex flex-col'>
      {children}
    </form>
  )
}

export default Form