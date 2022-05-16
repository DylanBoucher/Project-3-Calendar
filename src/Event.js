import React from 'react'

export default function Event() {
    const handleClick = () => {
        console.log('clicked')
    }
  return (
        <div className='add-event'>
            <button className='btn' onClick={handleClick}>+</button> 
        </div>
  )
}
