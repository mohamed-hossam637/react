import { Link } from 'react-router-dom';
import "./movieBox.css";

export default function MovieBox(props) {
    return (
        <Link className='movie-box col-md-4 col-lg-2 mb-5 position-relative sm-center-content' to={`/movie_details/${props.movies.id}/${props.movies.media_type}`}>
            <div className='wrapper'>
                <img src={`https://image.tmdb.org/t/p/w500${props.movies.poster_path}`} alt="movie poster" title={props.movies.title} />
            </div>
            <h3 className='movie-title h6 pt-2'>
                {props.movies.original_title || props.movies.original_name}
            </h3>
            <p className='movie-date'>
                {props.movies.release_date}
            </p>
            <span className='badge bg-primary py-2 position-absolute rate'>{props.movies.vote_average.toFixed(1)}</span>
        </Link>
    )
}
