import React from 'react'
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from "swiper";
import Loader from "../components/Loader";
import styled from 'styled-components'
import { render } from '@testing-library/react';
import { Link } from 'react-router-dom';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const MY_API_KEY = '3b62cbd3019cef6ea3bcc5ecce56c01c';


const Back = styled.div`
    position: relative;
    padding: 35px 0 35px;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    color: #fff;
`


const Slider = () => {
    SwiperCore.use([Autoplay]);
    
    const [moviesList, setMoviesList] = useState([]);
    const [isLoader, setIsLoader] = useState(true)
    const [error, setError] = useState();

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${MY_API_KEY}`).then( res => {//      
            if(!res.ok) {
                throw Error('Serverdan ma`lumot olish xatolik!');
            }
            return res.json();
        }).then( data => {
            setMoviesList(data.results.slice(0, 4));
            // setIsLoader(false); 
            // console.log(data.results.slice(0, 4))
        })
        .catch((err) => {
            // setIsLoader(false);

            setError(err.message);
        });
    }, []);


    const ratings = document.querySelectorAll(".rating");

    ratings.forEach((rating) => {
    const ratingContent = rating.innerHTML;
    console.log(ratingContent)
    const ratingScore = parseInt(ratingContent, 10);
    const scoreClass =
        ratingScore < 40 ? "bad" : ratingScore < 60 ? "meh" : "good";

    rating.classList.add(scoreClass);

    const ratingColor = window.getComputedStyle(rating).backgroundColor;
    const gradient = `background: conic-gradient(${ratingColor} ${ratingScore}%, transparent 0 100%)`;

    rating.setAttribute("style", gradient);
    rating.innerHTML = `<span>${ratingScore}${
        ratingContent.indexOf("%") >= 0 ? "<small>%</small>" : ""
    }</span>`;
    });

    return (
        <div className="slider">
            <Swiper modules={[Autoplay]} slidesPerView={1} loop autoplay={{ delay: 2000 , disableOnInteraction: false}}>
                {moviesList.map(el => (<SwiperSlide key={el.id}>
                    <Back style={{backgroundImage: `url(${IMAGE_URL + el.backdrop_path })`}}>
                        <div className="container" >
                            <div className="film" style={{display: "flex", justifyContent: 'space-between'}}>
                                <div className="slider__info">
                                    <h2 className="slider__title">{el.title}</h2>
                                    <p className="slider__text">{el.overview}</p>
                                    <div className="rating">{el.vote_average * 10}</div>
                                    <Link to={`/movie/${el.id}`} className="movie__link">View movie</Link>
                                </div>
                                <img src={IMAGE_URL + el.poster_path} alt={el.title} className="slider__img" />
                            </div>
                        </div>
                    </Back>
                </SwiperSlide>))}
            </Swiper>
            {/* {isLoader ? <Loader/> : <MovieSlider moviesArr={moviesList} />} */}
            {/* {error ? error : ''} */}
        </div>
    )
}

export default Slider;

// @uh7777, https://t.me/islomiyelonlar, https://t.me/AYAT_ARRAHMAN, Https://t.me/hafizotul_qurann 
