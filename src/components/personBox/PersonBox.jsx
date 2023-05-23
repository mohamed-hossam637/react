/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'

export default function personBox(props) {
  return (
    <div className='movie-box col-md-4 col-lg-2 mb-5 position-relative'>
    <div className='wrapper'>
        <img src={`https://image.tmdb.org/t/p/w500${props.person.profile_path}`} alt="actor image" title={props.person.name} />
    </div>
</div>
  )
}
