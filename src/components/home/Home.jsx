import React, { useEffect, useState } from 'react'
import "./home.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import MovieBox from '../movie box/MovieBox';
import SeriesBox from '../seriesBox/SeriesBox';
import PersonBox from "../personBox/PersonBox";
import Loading from '../loading/Loading';
import { Helmet } from 'react-helmet';

export default function Home() {

  let [trendingMovie, setTrendingMovie] = useState([]);
  let [trendingSeries, setTrendingSeries] = useState([]);
  let [trendingPerson, setTrendingPerson] = useState([]);
  let [background, setBackground] = useState("");

  let getTrendingMovie = () => {
    axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=fb0ce91ffb7e4ce36ebe5882861ff595`).then((response) => {
      let movies = trendingMovie ;
      movies = response.data.results ;
      movies.map((movie)=> movie.media_type = "movie") ;
      setTrendingMovie(movies);
    }).catch((err) => {
      console.log(err);
    })
  }

  let getTrendingSeries = () => {
    axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=fb0ce91ffb7e4ce36ebe5882861ff595`).then((response) => {
      let tv = trendingSeries ;
      tv = response.data.results ;
      tv.map((t)=> t.media_type = "tv") ;
      setTrendingSeries(tv);
    }).catch((err) => {
      console.log(err);
    })
  }

  let getTrendingPerson = () => {
    axios.get(`https://api.themoviedb.org/3/trending/person/day?api_key=fb0ce91ffb7e4ce36ebe5882861ff595`).then((response) => {
      let person = trendingPerson ;
      person = response.data.results ;
      setTrendingPerson(person)
    }).catch((err) => {
      console.log(err);
    })
  }

  // change section background on mouse over 

  let changeBackGround = (url) => {
    let bg = background ;
    bg = url ;
    setBackground(bg);
  }

  useEffect(() => {
    getTrendingMovie();
    getTrendingSeries();
    getTrendingPerson();
  }, []);

  return (
    <>
    <Helmet>
      <title>Home</title>
    </Helmet>
      <div className='home'>
        <div className='banner' style={trendingSeries.length > 0 ? {backgroundImage : `url(https://image.tmdb.org/t/p/w500${trendingSeries[Math.ceil(Math.random() * 6)].backdrop_path}`} : null}>
          <h2 className='text-center h1'>watch trending movie you want in one place</h2>
          <Link className="btn text-center" to="/explore">explore</Link>
        </div>
        <section className='most-trending-move container'>
          <h2 className='my-4 text-capitalize h4'>what is trending in movies</h2>
          <div className='row gap-3 d-flex justify-content-center p-2'>
            {trendingMovie.length > 0 ? trendingMovie.map((movie, index) => index < 5 ? <MovieBox key={movie.id} movies={movie} /> : "") : <Loading />}
          </div>
        </section>
        <section className='series-box container-fluid position-relative' style={background.length > 0 ? { backgroundImage: `url(https://image.tmdb.org/t/p/w500${background})` } : null}>
          <h2 className='container my-4 pt-3 text-capitalize text-light h4'>what is trending series</h2>
          <div className='row d-flex justify-content-center gap-3 p-2'>
            {trendingSeries.length > 0 ? trendingSeries.map((series, index) => index < 8 ? <SeriesBox key={series.id} movies={series} change={changeBackGround} /> : "") : <Loading />}
          </div>
        </section>
        <section className='trending-person container'>
          <h2 className='my-4 pt-3 text-capitalize h4'>trending actors</h2>
          <div className='row d-flex justify-content-center gap-3 p-2'>
            {trendingPerson.length > 0 ? trendingPerson.filter((person) => person.profile_path != null).map((person, index) => index < 7 ? <PersonBox key={person.id} person={person} /> : "") : <Loading />}
          </div>
        </section>
      </div>
    </>
  )
}
