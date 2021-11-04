import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Genres from '../components/Genres'
import MovieGrid from '../components/MovieGrid'

const MY_API_KEY = '3b62cbd3019cef6ea3bcc5ecce56c01c';

const Catalog = () => {

    const { genreid } = useParams()

    return (
        <div className="container">
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Genres/>
                {/* <MovieGrid genre={genreid}/> */}
                { <MovieGrid genre={genreid}/> ? <MovieGrid genre={genreid}/>  : '🤷‍♀️' }
            </div>
        </div>
    )
}

export default Catalog
