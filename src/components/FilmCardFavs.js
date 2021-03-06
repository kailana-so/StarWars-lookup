import './FilmCards.css'
import { PageContext } from './PageContext'
import { useContext } from 'react'
import { Link } from "react-router-dom";

import StarRoundedIcon from '@material-ui/icons/StarRounded';

export default function FilmCards(props){

    const { toRoman, handleOpenFilmDetails, handleRemoveFavourite } = useContext(PageContext)
    const film = props.data

    return (
        <section className="films-fav-card">
            <span className="clickable-link" onClick={() => handleRemoveFavourite(props)}> 
                <StarRoundedIcon /> 
            </span>
            <Link to={`/film-details/${film.title.split(' ').join('-')}`} exact="true">
                <h1 className="clickable-link" 
                    onClick={() => handleOpenFilmDetails(film)}> 
                    { film.title } { toRoman[film.episode_id] } 
                </h1>
            </Link>
            
        </section>
    )
}