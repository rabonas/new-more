import React, { useEffect, useState, useRef } from 'react'
import usePrevious from '../hooks'

const MY_API_KEY = '3b62cbd3019cef6ea3bcc5ecce56c01c';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';


const MovieGrid = ({genre}) => {

    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const prevGenre = usePrevious(genre);
    let list;

    const loadMore = () => {
        setPage(page + 1)
    }

    useEffect(() => {
        if(prevGenre != genre) {
            list = [];
        } else {
            list = movies;
        }
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${MY_API_KEY}&language=en-US&include_adult=false&with_genres=${genre}&page=${page}`)
        .then(res => res.json()).then(data => {
            setMovies(list.concat(data.results));
            setTotalPage(data.total_pages);
        })
    }, [genre, page])

    return (
        <div className="movie-grid">
            <h2> Movies count: {movies.length}</h2>
            <div className="row">
                {movies.map((el, i) => <div key={i} className="movie-grid__movie">
                    <img src={IMAGE_URL + el.poster_path} alt={el.title}/>
                    <h3>{el.title ? el.title : el.name}</h3>
                </div>)}
                {/* <button type="button" onClick={loadMore}>Load more</button> */}
                {page < totalPage ? <button type="button" onClick={loadMore} className="load custom-btn">Load more</button> : ''}
            </div>
        </div>
    )
}

export default MovieGrid
