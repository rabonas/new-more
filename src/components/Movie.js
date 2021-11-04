import { Link } from 'react-router-dom'
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';


const Movie = ({ movieobj }) => {
    const url = `/movie/${movieobj.id}`
    return (
        <Link to={url}>
            <div className="movie" key={movieobj.id} >
                <img src={IMAGE_URL + movieobj.backdrop_path} alt={movieobj.title} className="movie__img"/>
                <div className="movie__name_bg"></div>
                <h2 className="movie__name">{movieobj.title ? movieobj.title : movieobj.name}</h2>
            </div>
        </Link>
    )
}

export default Movie;