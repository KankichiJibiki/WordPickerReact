import React from 'react'

const Card = ({ children, bg='bg-white' }) => {
  return (
    <div className={ `${bg} w-72 p-6 rounded-lg shadow-md relative border-white border-2` }>
      { children }
    </div>
  )
}

export default Card