import React from 'react';
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from "swiper";
import { Link } from "react-router-dom";
import Movie from "../components/Movie";
import Loader from "../components/Loader";

const MY_API_KEY = '3b62cbd3019cef6ea3bcc5ecce56c01c';

const MovieSlider = ({moviesArr}) => {
    // SwiperCore.use([Autoplay]);
    return (
        <div className="sw">
            <Swiper modules={[Autoplay]} spaceBetween={50} slidesPerView={3} loop autoplay={{ delay: 2000 , disableOnInteraction: false}} style={{padding: '10px 0'}}>
                {moviesArr.map(el => (<SwiperSlide key={el.id}><Movie movieobj={el} /></SwiperSlide>))}
            </Swiper>
        </div>
    )
}

const Movielist = ({type, title}) => {

    const [moviesList, setMoviesList] = useState([]);
    const [isLoader, setIsLoader] = useState(true)
    const [error, setError] = useState();

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=${MY_API_KEY}`).then( res => {//      
            if(!res.ok) {
                throw Error('Serverdan ma`lumot olish xatolik!');
            }
            return res.json();
        }).then( data => {
            setMoviesList(data.results);
            setIsLoader(false);
        })
        .catch((err) => {
            setIsLoader(false);
            setError(err.message);
        });
    }, []);

    return (
        <div>
            <div className='row'><h2 className="movielist__title">{title}</h2> <Link to="/catalog" className="movie__link">all</Link></div>
            {isLoader ? <Loader/> : <MovieSlider moviesArr={moviesList} />}
            {error ? error : ''}
        </div>
    )
}

export default Movielist
