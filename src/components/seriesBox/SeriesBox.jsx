import React from 'react'
import { Link } from 'react-router-dom'

export default function SeriesBox(props) {
    return (
        <Link to={`/movie_details/${props.movies.id}/tv`} className='d-block movie-box col-md-4 col-lg-2 mb-5 position-relative sm-center-content' onMouseOver={() => props.change(props.movies.backdrop_path)} >
            <div className='wrapper'>
                <img src={`https://image.tmdb.org/t/p/w500${props.movies.poster_path}`} alt="movie poster" title={props.movies.title} />
            </div>
            <span className='badge bg-primary py-2 position-absolute rate'>{props.movies.vote_average.toFixed(1)}</span>
        </Link>
    )
}
