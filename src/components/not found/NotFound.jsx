import React from 'react'
import { Link } from 'react-router-dom';
import "./notfound.css";

export default function NotFound() {
  return (
    <>
      <div className='container not-found'>
        <h2>
          page not found 404 :(
        </h2>
        <p>we can not procede to this path</p>
        <Link to="/">back to home</Link>
      </div>
    </>
  )
}
