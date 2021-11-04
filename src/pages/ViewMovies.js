import React from 'react'
import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import ActorCard from '../components/ActorCard';
import SimilarCard from '../components/SimilarCard';

const MY_API_KEY = '3b62cbd3019cef6ea3bcc5ecce56c01c';
const SINGLE_MOVIE_API = `https://api.themoviedb.org/3/movie/`;
const API_PARAMS = `?api_key=${MY_API_KEY}&language=en-US`;
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const ViewBack = styled.div`
    background-size: cover;
    background-repeat: no-repeat;
`

const ViewMovies = () => {

    const [movieInfo, setMovieInfo] = useState({});
    const [actorInfo, setActorInfo] = useState([]);
    const [similarInfo, setSimilarInfo] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetch(SINGLE_MOVIE_API + id + API_PARAMS).then(res => res.json()).then(data => {
            setMovieInfo(data);
            // console.log(data)
        });

        fetch(SINGLE_MOVIE_API + id + '/credits' + API_PARAMS).then( res => res.json())
        .then(data => {
            // console.log(data);
            setActorInfo(data.cast);
        });

        fetch(SINGLE_MOVIE_API + id + '/similar' + API_PARAMS).then( res => res.json() )
        .then(data => {
            setSimilarInfo(data.results);
            // console.log(data);
        });
    }, [id])

    return (
        <div>
            <div className="view-movie__info">
                <ViewBack style={{backgroundImage: `url(${IMAGE_URL + movieInfo.backdrop_path })`}}>
                    <div className="view__bg" key={movieInfo.id}>
                        <div className="container">
                            <div className="row2">
                                <img src={IMAGE_URL + movieInfo.poster_path} alt={movieInfo.title} className="view-movie" style={{width: '30%'}} />
                                <div className="view-movie__text">
                                    <h3>{movieInfo.title ? movieInfo.title : movieInfo.name}</h3>
                                    <span className="info">Genres: { movieInfo.genres ? movieInfo.genres.map( el => <span>{el.name}</span>) : ''}</span>
                                    <span className="info">Country: { movieInfo.production_countries ? movieInfo.production_countries.map( el => <span>{el.name}</span>) : ''}</span>
                                    <span className="info">Data: <span>{movieInfo.release_date}</span></span>
                                    <p>{movieInfo.overview}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ViewBack>
                
            </div>
            <div className="container">
                <div className="row">
                    <Swiper spaceBetween={30} slidesPerView={6}>
                        {actorInfo.map((el, i) => (<SwiperSlide key={i} style={{backgroundColor: '#fff', padding: '5px'}}><ActorCard actorobj={el}/></SwiperSlide>))};
                    </Swiper>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <Swiper spaceBetween={30} slidesPerView={4}>
                        {similarInfo.map((el, i) => (<SwiperSlide key={i} style={{backgroundColor: '#fff'}}><SimilarCard movieobj={el}/></SwiperSlide>))};
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default ViewMovies
