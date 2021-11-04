import React from 'react'

const Loader = () => {
    return (
        <div className="loader">
            <div className="loader__container">
                <div className="loader__film">
                    <img className="loader__film-img" src="img/film.png" alt="" />
                    <img className="loader__film-img" src="img/film.png" alt="" />
                </div>
                <img className="loader__camera" src="img/camera.png" alt="" />
            </div>
        </div>
    )
}

export default Loader
