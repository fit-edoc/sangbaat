import React from 'react'
import {PuffLoader} from 'react-spinners'
 
const Loader = () => {
  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      <PuffLoader />
    </div>
  )
}

export default Loader
