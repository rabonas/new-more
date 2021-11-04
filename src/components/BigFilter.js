import React, { useEffect,useState } from 'react'

import styled from 'styled-components'
import Select from 'react-select';
import Movie from './Movie';

const MY_API_KEY = '3b62cbd3019cef6ea3bcc5ecce56c01c';
const API_PARAMS = `?api_key=${MY_API_KEY}&language=en-US`;
const GENRES = `https://api.themoviedb.org/3/genre/movie/list${API_PARAMS}`;

const InputGap = styled.div`
margin-bottom: 25px;
border:1px red solid;
color:yellow;
`;

const Label = styled.label`
color: white;
`;

const BigSearchTitle = styled.h1`
margin-bottom: 30px;
color: white;
`;

const SearchedMovies = styled.div`
display:flex;
padding:10px;
flex-wrap:wrap;
margin-top:30px;
`;


const BigFilter = () => {
  
    const SORT_BY_ALL = `https://api.themoviedb.org/3/discover/movie?api_key=${MY_API_KEY}&language=en-US&sort_by=${sort}.desc&include_adult=false&page=1&year=${year}&with_genres=${genre}`;
    
    const [sort, setSort] = useState("");
    const [year, setYear] = useState("");
    const [total, setTotal] = useState(0);
    const [genre, setGenre] = useState('');
    const [genreList, setGenreList] = useState([]);

    const [error,  setError] = useState()

    useEffect(() => {
        fetch(GENRES)
          .then((res) => {
            if (!res.ok) {
              throw Error("Serverda ma'lumot olishda xatolik!!");
            }
            return res.json();
          })
          .then((data) => {
            console.log(data);
            setGenreList(data.genres);
          })
          .catch((err) => {
            setError(err.message);
          });
      }, []);

      const newGenreArr = genreList.map((el) => {
        return { value: el.id, label: el.name };
      });

      const handleGenreChange = (newValue) => {
        console.log(newValue);
        const mappedGenre = newValue.map((el) => el.value);
        // men tanlayotgan janrlarimni olib join qilib beradi
        console.log(mappedGenre);
        setGenre(`${mappedGenre}`);
        // setGenre(mappedGenre.join(''));
        // console.log(setGenre(mappedGenre.join('')))
        console.log(`${mappedGenre}`)
      };

      const YearOptions = [
        { value: "2000", label: "2000" },
        { value: "2001", label: "2001" },
        { value: "2002", label: "2002" },
        { value: "2003", label: "2003" },
        { value: "2004", label: "2004" },
        { value: "2005", label: "2005" },
        { value: "2006", label: "2006" },
        { value: "2007", label: "2007" },
        { value: "2008", label: "2008" },
        { value: "2009", label: "2009" },
        { value: "2010", label: "2010" },
      ];
    
      const handleYearChange = (newValue) => {
        setYear(newValue.value);
        console.log(newValue);
      };

      const sortOptions = [
        { value: "popularity.asc", label: "Popularity" },
        { value: "release_date.asc", label: "Release Date" },
        { value: "revenue.asc", label: "Budget" },
        { value: "vote_average.asc", label: "Rating" },
        { value: "original_title.asc", label: "Title" },
      ];
    
      const handleSortChange = (newValue) => {
        setSort(newValue.value);
        console.log(newValue);
      };

      const [discover, setDiscover] = useState([]);

        const handleDiscover = () => {
            fetch(SORT_BY_ALL)
            .then((res) => {
                if (!res.ok) {
                throw Error("Serverda ma'lumot olishda xatolik!!");
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setDiscover(data.results);
                
                setTotal(data.total_results);
            })
            .catch((err) => {
                setError(err.message);
            });
        };



    return (
        <div>
            <form >
                <BigSearchTitle>Big Search</BigSearchTitle>

                <Label>Till Year</Label>
                <Select options={YearOptions} onChange={handleYearChange} />

                <Label> Genre </Label>
                <Select options={newGenreArr} isMulti onChange={handleGenreChange} />

                <Label> Sort by </Label>
                <Select options={sortOptions} onChange={handleSortChange} />
                <br />

                <InputGap>
                    <button className="search-btn" type="button" onClick={handleDiscover}> Discover </button>
                    <div>Found <span>{total}</span> Movies{" "}</div>
                </InputGap>
            </form>
            <SearchedMovies className ='searched_movies'>
          {!error ? discover.map((el) => ( 
            <Movie className="movies-wrapper" movieobj={el} key={el.id} /> )) : error}
        </SearchedMovies>
        </div>
    )
}

export default BigFilter;
