import React from 'react'

const Spinner=()=> {
  return (
    <div>
      <div className="spinner-border"  role="status" style={{marginLeft:"44%"}}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}
export default Spinner