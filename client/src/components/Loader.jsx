import React from 'react'
import LoadingGif from '../images/loader.gif'

function Loader() {
  return (
    <div className='loader'>
        <div className="loader__image">
            <img src={LoadingGif} alt="" />
        </div>
    </div>
  )
}

export default Loader

