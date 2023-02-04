import React from 'react'
import { Button } from 'react-bootstrap'
import "./NotFound.css"
import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div className='notfound-container'>
      <Link to="/">
       <Button variant='danger' >Back To Home</Button>
       </Link>
    </div>
  )
}
