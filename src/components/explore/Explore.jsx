import axios from 'axios'
import React, { useEffect, useState } from 'react';
import MovieBox from '../movie box/MovieBox';
import PersonBox from "../personBox/PersonBox";
import Loading from '../loading/Loading';
import { Helmet } from 'react-helmet';

export default function Explore() {

  const [movieData, setMovieData] = useState([]);
  const [tvData, setTvData] = useState([]);
  const [personData, setPersonData] = useState([]);


  let getMediaData = (media_type, setMediaData) => {
    axios.get(`https://api.themoviedb.org/3/trending/${media_type}/week?api_key=fb0ce91ffb7e4ce36ebe5882861ff595`).then((res) => {
      setMediaData(res.data.results);
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    getMediaData("movie", setMovieData)
    getMediaData("tv", setTvData)
    getMediaData("person", setPersonData)
  }, [])

  return (
    <>
    <Helmet>
      <title>Explore</title>
    </Helmet>
      <div className='container'>
        <section className='most-trending-move container'>
          <h2 className='my-4 text-capitalize h4'>all trending movies</h2>
          <div className='row gap-4 p-2'>
            {movieData.length > 0 ? movieData.map((movie, index) =>  <MovieBox key={movie.id} movies={movie} />)  : <Loading />}
          </div>
        </section>
        <section className='container position-relative'>
          <h2 className='container my-4 pt-3 text-capitalize text-light h4'>all trending tv show</h2>
          <div className='row d-flex justify-content-center gap-4 p-2'>
            {tvData.length > 0 ? tvData.map((series, index) => <MovieBox key={series.id} movies={series} />): <Loading />}
          </div>
        </section>
        <section className='trending-person container'>
          <h2 className='my-4 pt-3 text-capitalize h4'>trending actors</h2>
          <div className='row d-flex justify-content-center gap-4 p-2'>
            {personData.length > 0 ? personData.filter((person) => person.profile_path != null).map((person, index) => <PersonBox key={person.id} person={person} />) : <Loading />}
          </div>
        </section>
      </div>
    </>
  )
}
