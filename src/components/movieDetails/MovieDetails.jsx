import { useParams } from 'react-router-dom'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./movieDetails.css"
import Loading from '../loading/Loading';
import MovieBox from '../movie box/MovieBox';
import { Helmet } from 'react-helmet';
import AddToFavorite from '../addToFavorite/AddToFavorite';

export default function MovieDetails() {

    let params = useParams();

    let [mediaData, setMediaData] = useState({});
    let [trailer, setTrailer] = useState([]);
    let [creditsCast, setCreditsCast] = useState([]);
    let [creditsCrew, setCreditsCrew] = useState([]);
    let [recommendationsList, setRecommendationsList] = useState([]);

    // https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US
    // https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=<<api_key>>&language=en-US&page=1
    // https://www.youtube.com/watch?v=key
    // https://api.themoviedb.org/3/movie/${param.id}/videos?api_key=fb0ce91ffb7e4ce36ebe5882861ff595&language=en-US

    let getMovieData = (param) => {
        axios.get(`https://api.themoviedb.org/3/${param.media_type}/${param.id}?api_key=fb0ce91ffb7e4ce36ebe5882861ff595&language=en-US`).then((res) => {
            let data = mediaData;
            data = res.data;
            setMediaData(data);
        }).catch((err) => {
            console.log(err);
        })
    }

    let getTrailerVideo = (param) => {
        axios.get(`https://api.themoviedb.org/3/${param.media_type}/${param.id}/videos?api_key=fb0ce91ffb7e4ce36ebe5882861ff595&language=en-US`).then((res) => {
            let video = trailer;
            video = res.data.results.filter((t) => t.type === "Trailer");
            setTrailer(video);
        }).catch((err) => {
            console.log(err)
        })
    }

    let getCredits = (param) => {
        axios.get(`https://api.themoviedb.org/3/${param.media_type}/${param.id}/credits?api_key=fb0ce91ffb7e4ce36ebe5882861ff595&language=en-US`).then((res) => {
            let creditsCastList = creditsCast;
            creditsCastList = res.data.cast;
            setCreditsCast(creditsCastList);

            let creditsCrewList = creditsCrew;
            creditsCrewList = res.data.crew;
            setCreditsCrew(creditsCrewList);
        }).catch((err) => {
            console.log(err)
        })
    }

    let recommendations = (param) => {
        axios.get(`https://api.themoviedb.org/3/${param.media_type}/${param.id}/recommendations?api_key=fb0ce91ffb7e4ce36ebe5882861ff595&language=en-US&page=1`).then((res) => {
            let recommendation = recommendationsList;
            recommendation = res.data.results;
            setRecommendationsList(recommendation);
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getMovieData(params);
        getTrailerVideo(params);
        getCredits(params);
        recommendations(params)
    }, [])

    useEffect(() => {
        getMovieData(params);
        getTrailerVideo(params);
        getCredits(params);
        recommendations(params)
    }, [params])
    // 
    return (
        <>
            <Helmet>
                <title>{mediaData.original_title || mediaData.name}</title>
            </Helmet>
            <div className='container-fluid mb-4 movie_details d-flex align-items-center' style={Object.keys(mediaData).length > 0 ? { backgroundImage: `url(https://image.tmdb.org/t/p/w500${mediaData.backdrop_path})` } : null}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-3 col-md-4 position-relative sm_media_details'>
                            {
                                Object.keys(mediaData).length > 0 ? <>
                                    <img className='w-100' src={`https://image.tmdb.org/t/p/w500${mediaData.poster_path}`} alt="poster" />
                                    <span className='badge bg-primary py-2 position-absolute rate'>{mediaData.vote_average.toFixed(1)}</span>
                                </> : <Loading />
                            }
                        </div>
                        <div className='details-box col-lg-9 col-md-8'>
                            {Object.keys(mediaData).length > 0 ?
                                <>
                                    <div>
                                        <h3 className='h2 fw-bold text-light'>{mediaData.original_title || mediaData.name}  ( {(mediaData.release_date || mediaData.first_air_date).split("-")[0]} )</h3>
                                        <p className='text-muted'>{mediaData.tagline}</p>
                                        <p className='text-muted'>{mediaData.release_date || mediaData.first_air_date} <AddToFavorite data={mediaData} media={params} /></p>
                                    </div>
                                    <div className='badges mb-4'>
                                        {mediaData.genres.map((genre) => <span key={genre.id} className="badge bg-primary me-2 py-2">{genre.name}</span>)}
                                    </div>
                                    <div className='trailer_video mb-2'>
                                        {trailer.length > 0 ? <iframe className='sm-w100' src={`https://www.youtube.com/embed/${trailer[0].key}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> : <Loading />}
                                    </div>
                                    <div className='overview'>
                                        <h3 className='h5 text-capitalize'>overview</h3>
                                        <p className='fs-6'>
                                            {mediaData.overview}
                                        </p>
                                    </div>
                                </> : <Loading />
                            }
                        </div>
                    </div>
                </div>
            </div>
            {
                trailer.length > 1 ?
                    <div className='container mb-5'>
                        <h3 className='text-capitalize mb-4'> author trailer</h3>
                        <div className='row o-scroll'>
                            {trailer.map((t) =>
                                <iframe height="200" className='col-lg-3 col-md-6 me-2' key={t.id} src={`https://www.youtube.com/embed/${t.key}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                            )}
                        </div>
                    </div>
                    : null
            }
            <div className='cast container'>
                <h3 className='h4 text-capitalize'> Cast</h3>
                <div className='row'>
                    {
                        creditsCast.length > 0 ? creditsCast.filter((c) => c.profile_path != null).map((cast, index) => {
                            return <div className='col-lg-3 col-md-4 cast-box sm-center-content' key={cast.id}>
                                <div className='wrapper'>
                                    <img className='w-100' src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`} alt="...." />
                                </div>
                                <p className='text-capitalize'>
                                    {cast.original_name}
                                </p>
                                <p className='text-muted'>
                                    character : {cast.character}
                                </p>
                                <p className='text-muted'>
                                    {cast.known_for_department}
                                </p>
                            </div>

                        }) : <Loading />
                    }
                </div>
            </div>
            <div className='crew container'>
                <h3 className='h4 text-capitalize'>crew</h3>
                <div className='row'>
                    {
                        creditsCrew.length > 0 ? creditsCrew.filter((c) => c.profile_path != null).map((crew, index) => {
                            return <div className='col-lg-3 col-md-4 crew-box sm-center-content' key={crew.id}>
                                <div className='wrapper'>
                                    <img className='w-100' src={`https://image.tmdb.org/t/p/w500${crew.profile_path}`} alt="...." />
                                </div>
                                <p className='text-capitalize'>
                                    {crew.original_name}
                                </p>
                                <p className='text-muted'>
                                    department : {crew.department}
                                </p>
                                <p className='text-muted'>
                                    {crew.known_for_department}
                                </p>
                            </div>

                        }) : <Loading />
                    }
                </div>
            </div>
            <section className='most-trending-move container'>
                <h2 className='my-4 text-capitalize h4'>recommendations </h2>
                <div className='row gap-4 p-2'>
                    {recommendationsList.length > 0 ? recommendationsList.map((movie, index) => index < 5 ? <MovieBox key={movie.id} movies={movie} /> : "") : <Loading />}
                </div>
            </section>
        </>
    )
}

