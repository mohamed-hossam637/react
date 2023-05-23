import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import Loading from '../loading/Loading';
import MovieBox from '../movie box/MovieBox';

export default function TopRated() {
    // https://api.themoviedb.org/3/all/top_rated?api_key=fb0ce91ffb7e4ce36ebe5882861ff595&language=en-US&page=1

    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [topRatedTv, setTopRatedTv] = useState([]);

    let getTopRatedMovie = () => {
        axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=fb0ce91ffb7e4ce36ebe5882861ff595&language=en-US&page=1`).then((response) => {
            let list = topRatedMovies;
            list = response.data.results;
            list.map((item)=>item.media_type = "movie")
            setTopRatedMovies(list);
        }).catch((err) => {
            console.log(err);
        })
    }

    let getTopRatedTv = () => {
        axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=fb0ce91ffb7e4ce36ebe5882861ff595&language=en-US&page=1`).then((response) => {
            let list = topRatedTv;
            list = response.data.results;
            list.map((item)=>item.media_type = "tv")
            setTopRatedTv(list);
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getTopRatedMovie();
        getTopRatedTv();
    }, [])

    return (
        <>
        <Helmet>
            <title>Top Rated</title>
        </Helmet>
            <div className='container my-3'>
                <h3 className='text-capitalize my-2'>top rated movies</h3>
                <div className='row gap-4 p-2'>
                    {topRatedMovies.length > 0 ? topRatedMovies.map((movie, index) => <MovieBox key={movie.id} movies={movie} /> ) : <Loading />}
                </div>
            </div>
            <div className='container my-3'>
                <h3 className='text-capitalize my-2'>top rated tv</h3>
                <div className='row gap-4 p-2'>
                    {topRatedTv.length > 0 ? topRatedTv.map((movie, index) => <MovieBox key={movie.id} movies={movie} /> ) : <Loading />}
                </div>
            </div>

        </>
    )
}
