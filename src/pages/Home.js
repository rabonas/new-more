import Movielist from "../components/Movielist";
import Slider from "../components/Slider";
// const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${MY_API_KEY}&language=en-US&include_adult=false`

const Home = () => {

    // const hendleSearch = (e) => {
    //     if(e.target.value.length > 2) {
    //         fetch(SEARCH_API + `&query=${e.target.value}`).then(res => res.json()).then( data => {
    //             console.log(data.results);
    //             setMoviesList(data.results);
    //         })
    //     }
    // }

    return (
        <div className="page-content">
                <Slider/>
                {/* <input type="text" placeholder="Search" onChange={hendleSearch} /> */}
            <div className="container">
                <Movielist type='top_rated' title='Top Movies' />
                <Movielist type='upcoming' title='Upcoming Movies' />
                <Movielist type='popular' title='Popular Movies' />
            </div>
        </div>
    )
}

export default Home;