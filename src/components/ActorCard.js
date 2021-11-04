import React from 'react'
import { Link } from 'react-router-dom';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const ActorCard = (props) => {
    return (
        <a href={`https://en.wikipedia.org/wiki/${props.actorobj.name}`} className="actor">
            {props.actorobj.profile_path ? <img src={IMAGE_URL + props.actorobj.profile_path} alt={props.actorobj.name} /> : <div className="poster">Poster</div>}
            <h4 className="actor__name">{props.actorobj.name}</h4>
        </a>
    )
}

export default ActorCard;